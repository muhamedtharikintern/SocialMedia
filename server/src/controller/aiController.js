import axios from 'axios';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const HF_API_URL = "https://router.huggingface.co/hf-inference/models/google/flan-t5-large";

//'https://api-inference.huggingface.co/models/google/flan-t5-large'

/* ─────────────────────────────────────────────────────────────
   HELPER: Call HuggingFace with retry on model-loading state
   ───────────────────────────────────────────────────────────── */

const callHuggingFace = async (inputs, retries = 3) => {

  // ── CRITICAL: Check token exists before any call ──────────────
  const token = process.env.HF_TOKEN;

  if (!token) {
    console.error('❌ HF_TOKEN is missing from environment variables!');
    throw new Error('HF_TOKEN not configured on server.');
  }

  console.log('✅ HF_TOKEN found, length:', token.length);

  const HF_HEADERS = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`\n🔁 HF Attempt ${attempt}/${retries}`);
      console.log('📤 Input:', inputs);

      const response = await axios.post(
        HF_API_URL,
        {
          inputs,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            do_sample: true,
          },
          options: {
            wait_for_model: true,
            use_cache: false,
          },
        },
        {
          headers: HF_HEADERS,
          timeout: 60000,
        },
      );

      console.log('📥 HF Raw Response:', JSON.stringify(response.data));

      const generated = Array.isArray(response.data)
        ? response.data[0]?.generated_text || ''
        : response.data?.generated_text || '';

      console.log('✅ Generated text:', generated);

      if (generated) return generated;

      console.log(`⚠️ Empty generated_text on attempt ${attempt}, retrying...`);

    } catch (error) {
      const status = error.response?.status;
      const errData = error.response?.data;

      console.error(`\n❌ HF Error on attempt ${attempt}:`);
      console.error('   Status:', status);
      console.error('   Data:', JSON.stringify(errData));
      console.error('   Message:', error.message);

      // 401 — Bad/missing token, no point retrying
      if (status === 401) {
        throw new Error('HuggingFace authentication failed. Check your HF_TOKEN.');
      }

      // 403 — Model access denied
      if (status === 403) {
        throw new Error('Access denied to this HuggingFace model.');
      }

      // Model is loading — wait and retry
      if (
        errData?.error?.toLowerCase().includes('loading') ||
        status === 503
      ) {
        const waitTime = (errData?.estimated_time || 20) * 1000;
        console.log(`⏳ Model loading, waiting ${waitTime / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      // Rate limit — wait 5s and retry
      if (status === 429) {
        console.log('⏳ Rate limited, waiting 5s...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      // Timeout or network error — retry
      if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
        console.log('⏳ Network error, waiting 3s before retry...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }

      // Other error — throw immediately
      throw error;
    }
  }

  console.log('⚠️ All retries exhausted, returning null');
  return null;
};

/* ─────────────────────────────────────────────────────────────
   DEBUG ROUTE — GET /ai/debug
   Hit this in Postman first to confirm env + HF connectivity
   ───────────────────────────────────────────────────────────── */

const debugAI = async (req, res) => {
  const token = process.env.HF_TOKEN;

  if (!token) {
    return res.status(500).json({
      success: false,
      issue: 'HF_TOKEN is not set in environment variables',
      fix: 'Add HF_TOKEN=hf_xxxx to your .env file and restart the server',
    });
  }

  try {
    const testResponse = await axios.post(
      HF_API_URL,
      {
        inputs: 'Say hello',
        options: { wait_for_model: true },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      },
    );

    return res.json({
      success: true,
      token_length: token.length,
      token_prefix: token.substring(0, 10) + '...',
      hf_response: testResponse.data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      token_length: token.length,
      token_prefix: token.substring(0, 10) + '...',
      hf_status: error.response?.status,
      hf_error: error.response?.data,
      message: error.message,
    });
  }
};

/* ─────────────────────────────────────────────────────────────
   GENERATE CAPTION
   ───────────────────────────────────────────────────────────── */

const generateCaption = async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('\n📝 Caption request received, prompt:', prompt);

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required.',
      });
    }

    const inputs = `Write an engaging social media caption for: ${prompt}`;

    const generated = await callHuggingFace(inputs);

    const caption =
      generated ||
      `✨ ${prompt} — crafted with creativity and passion. Double tap if you love it! 💫`;

    console.log('✅ Final caption:', caption);

    return res.json({
      success: true,
      caption,
    });

  } catch (error) {
    console.error('\n❌ generateCaption crashed:', error.message);

    return res.status(500).json({
      success: false,
      message: error.message || 'Caption generation failed. Please try again.',
    });
  }
};

/* ─────────────────────────────────────────────────────────────
   GENERATE HASHTAGS
   ───────────────────────────────────────────────────────────── */

const generateHashtags = async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('\n#️⃣ Hashtag request received, prompt:', prompt);

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required.',
      });
    }

    const inputs = `List 10 Instagram hashtags for: ${prompt}`;

    const generated = await callHuggingFace(inputs);

    let hashtags = [];

    if (generated) {
      hashtags = generated
        .split(/\s+/)
        .map(tag => {
          const clean = tag.replace(/[^a-zA-Z0-9#]/g, '');
          return clean.startsWith('#') ? clean : `#${clean}`;
        })
        .filter(tag => tag.length > 1);
    }

    if (hashtags.length < 3) {
      console.log('⚠️ Using keyword fallback for hashtags');

      const keywords = prompt
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .split(' ')
        .filter(w => w.length > 2)
        .slice(0, 5)
        .map(w => `#${w}`);

      hashtags = [
        ...keywords,
        '#AIArt',
        '#CreateAI',
        '#Trending',
        '#Viral',
        '#ContentCreator',
        '#Reels',
        '#Instagram',
      ];

      hashtags = [...new Set(hashtags)].slice(0, 10);
    }

    console.log('✅ Final hashtags:', hashtags);

    return res.json({
      success: true,
      hashtags,
    });

  } catch (error) {
    console.error('\n❌ generateHashtags crashed:', error.message);

    return res.status(500).json({
      success: false,
      message: error.message || 'Hashtag generation failed. Please try again.',
    });
  }
};

const generateCaptionFromImage = async (req, res) => {
  try {
    const token = process.env.HF_TOKEN;
    const file  = req.file; // image buffer from multer

    if (!file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-base",
      file.buffer,  // send raw image buffer
      {
        headers: {
          Authorization:  `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': file.mimetype,
        },
        timeout: 60000,
      },
    );

    const caption = response.data?.[0]?.generated_text ?? '';

    return res.json({ success: true, caption });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { generateCaption, generateHashtags, debugAI,generateCaptionFromImage };