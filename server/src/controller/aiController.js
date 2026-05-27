import axios from 'axios';

const HF_API_URL =
  'https://api-inference.huggingface.co/models/google/flan-t5-large';

const HF_HEADERS = {
  Authorization: `Bearer ${process.env.HF_TOKEN}`,
  'Content-Type': 'application/json',
};

/* ─────────────────────────────────────────────────────────────
   HELPER: Call HuggingFace with retry on model-loading state
   ───────────────────────────────────────────────────────────── */

const callHuggingFace = async (inputs, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        HF_API_URL,
        {
          inputs,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            do_sample: true,
          },
          // Tell HF to wait for model to load instead of erroring
          options: { wait_for_model: true },
        },
        { headers: HF_HEADERS },
      );

      console.log(`HF Response (attempt ${attempt}):`, response.data);

      // Handle array or object response shape
      const generated = Array.isArray(response.data)
        ? response.data[0]?.generated_text || ''
        : response.data?.generated_text || '';

      if (generated) return generated;

      // Empty text — retry
      console.log(`Empty generated_text on attempt ${attempt}, retrying...`);

    } catch (error) {
      const errData = error.response?.data;
      console.log(`HF Error (attempt ${attempt}):`, errData || error.message);

      // Model is loading — wait and retry
      if (errData?.error?.includes('loading')) {
        const waitTime = (errData.estimated_time || 20) * 1000;
        console.log(`Model loading, waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      // Rate limit — wait 5s and retry
      if (error.response?.status === 429) {
        console.log('Rate limited, waiting 5s...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        continue;
      }

      // Other error — throw immediately
      throw error;
    }
  }

  // All retries exhausted
  return null;
};

/* ─────────────────────────────────────────────────────────────
   GENERATE CAPTION
   ───────────────────────────────────────────────────────────── */

const generateCaption = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required.',
      });
    }

    const inputs = `Write an engaging and creative social media caption for: ${prompt}. Make it catchy and include emojis.`;

    const generated = await callHuggingFace(inputs);

    // Fallback if all retries return empty
    const caption =
      generated ||
      `✨ ${prompt} — crafted with creativity and passion. Double tap if you love it! 💫`;

    return res.json({
      success: true,
      caption,
    });

  } catch (error) {
    console.log('Caption Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Caption generation failed. Please try again.',
    });
  }
};

/* ─────────────────────────────────────────────────────────────
   GENERATE HASHTAGS
   ───────────────────────────────────────────────────────────── */

const generateHashtags = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required.',
      });
    }

    // Instruct the model to output space-separated hashtags
    const inputs = `List 10 popular Instagram hashtags for "${prompt}". Each hashtag must start with #. Output only the hashtags separated by spaces.`;

    const generated = await callHuggingFace(inputs);

    let hashtags = [];

    if (generated) {
      // Extract any word starting with # from the response
      hashtags = generated
        .split(/\s+/)
        .map(tag => {
          // Clean up and normalize — add # if missing
          const clean = tag.replace(/[^a-zA-Z0-9#]/g, '');
          return clean.startsWith('#') ? clean : `#${clean}`;
        })
        .filter(tag => tag.length > 1); // Remove lone '#'
    }

    // Fallback: generate keyword-based hashtags from the prompt itself
    if (hashtags.length < 3) {
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

      // Deduplicate
      hashtags = [...new Set(hashtags)].slice(0, 10);
    }

    return res.json({
      success: true,
      hashtags,
    });

  } catch (error) {
    console.log('Hashtag Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Hashtag generation failed. Please try again.',
    });
  }
};

export { generateCaption, generateHashtags };