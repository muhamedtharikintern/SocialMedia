const axios = require('axios');

const generateCaption = async (
  req,
  res,
) => {

  try {

    const {
      prompt,
    } = req.body;

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

    const generated =
      response.data[0]?.generated_text;

    res.json({
      success: true,
      caption: generated,
    });

  } catch (error) {

    console.log(error.response?.data);

    res.status(500).json({
      success: false,
      message:
        'Caption generation failed',
    });
  }
};



const generateHashtags = async (
  req,
  res,
) => {

  try {

    const {
      prompt,
    } = req.body;

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

    const generated =
      response.data[0]?.generated_text;

    res.json({
      success: true,
      hashtags: generated,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Hashtag generation failed',
    });
  }
};

module.exports = {
  generateCaption,
  generateHashtags,
};