import axios from 'axios';

/* =====================================
   GENERATE CAPTION
===================================== */

const generateCaption = async (
  req,
  res,
) => {

  try {

    const {prompt} = req.body;

    const response =
      await axios.post(

      'https://api-inference.huggingface.co/models/google/flan-t5-large',

      {
        inputs:
          `Generate social media caption for: ${prompt}`,
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.HF_TOKEN}`,
        },
      },
    );

    console.log(
      'Caption API Response:',
      response.data,
    );

    /*
      HANDLE BOTH RESPONSE TYPES
    */

    let generated = '';

    if (
      Array.isArray(response.data)
    ) {

      generated =
        response.data[0]
          ?.generated_text || '';

    } else {

      generated =
        response.data
          ?.generated_text || '';
    }

    /*
      FALLBACK
    */

    if (!generated) {

      generated =
        'AI generated creative caption';
    }

    res.json({
      success: true,
      caption: generated,
    });

  } catch (error) {

    console.log(
      'Caption Error:',
      error.response?.data ||
      error.message,
    );

    res.status(500).json({
      success: false,
      message:
        'Caption generation failed',
    });
  }
};

/* =====================================
   GENERATE HASHTAGS
===================================== */

const generateHashtags = async (
  req,
  res,
) => {

  try {

    const {prompt} = req.body;

    const response =
      await axios.post(

      'https://api-inference.huggingface.co/models/google/flan-t5-large',

      {
        inputs:
          `Generate 10 trending Instagram hashtags for: ${prompt}`,
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.HF_TOKEN}`,
        },
      },
    );

    console.log(
      'Hashtag API Response:',
      response.data,
    );

    /*
      HANDLE BOTH RESPONSE TYPES
    */

    let generated = '';

    if (
      Array.isArray(response.data)
    ) {

      generated =
        response.data[0]
          ?.generated_text || '';

    } else {

      generated =
        response.data
          ?.generated_text || '';
    }

    /*
      CONVERT TO ARRAY
    */

    const hashtags =
      generated
        .split(' ')
        .filter(tag =>
          tag.startsWith('#'),
        );

    /*
      FALLBACK TAGS
    */

    const finalHashtags =
      hashtags.length > 0
        ? hashtags
        : [
            '#AIArt',
            '#CreateAI',
            '#Vibeo',
          ];

    res.json({
      success: true,
      hashtags: finalHashtags,
    });

  } catch (error) {

    console.log(
      'Hashtag Error:',
      error.response?.data ||
      error.message,
    );

    res.status(500).json({
      success: false,
      message:
        'Hashtag generation failed',
    });
  }
};

export {
  generateCaption,
  generateHashtags,
};