import Post from '../models/Posts.js';

const createPost = async (req, res) => {
  try {
    const { caption, hashtags, visibility, url, type } = req.body;

    const userId = req.userId; // 👈 comes from authMiddleware, not body

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
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
      media: [{ url, type: type ?? 'image' }],
    });

    return res.status(201).json({ success: true, post });

  } catch (error) {
    console.error('Post Create Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create post',
      error:   error.message,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message,
    });
  }
};

export { createPost, getUserPosts, getAllPosts };

