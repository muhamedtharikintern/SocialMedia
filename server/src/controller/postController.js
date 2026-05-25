import Post from '../models/Posts.js';

const createPost = async (req, res) => {
  try {
    const { userId, caption, hashtags, visibility, url, type } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'media url is required',
      });
    }

    const post = await Post.create({
      userId,
      caption:    caption    ?? '',
      hashtags:   hashtags   ? JSON.parse(hashtags) : [],
      visibility: visibility ?? 'public',
      media: [
        {
          url,
          type: type ?? 'image',
        },
      ],
    });

    return res.status(201).json({
      success: true,
      post,
    });

  } catch (error) {
    console.error('Post Create Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create post',
      error:   error.message,
    });
  }
};

export { createPost };