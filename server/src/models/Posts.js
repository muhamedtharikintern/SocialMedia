import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    caption: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },

    hashtags: [
      {
        type: String,
        trim: true,
      },
    ],

    media: {
      type: [mediaSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message:
          'At least one media file is required',
      },
    },

    visibility: {
      type: String,
      enum: ['public', 'private', 'followers'],
      default: 'public',
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    sharesCount: {
      type: Number,
      default: 0,
    },

    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model(
  'Post',
  postSchema
);

export default Post;