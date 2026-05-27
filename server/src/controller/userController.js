import dotenv          from 'dotenv';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3               from '../config/s3.js';
import User             from '../models/User.js';

dotenv.config();

/* =========================
    GET PROFILE
========================= */

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
    EDIT PROFILE
========================= */

const editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, username, bio, phone, website, gender } = req.body;

    const updateFields = {};
    if (name)     updateFields.name     = name;
    if (username) updateFields.username = username;
    if (bio)      updateFields.bio      = bio;
    if (phone)    updateFields.phone    = phone;

    // ── Upload new avatar to S3 if provided ──────
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const params   = {
        Bucket:      process.env.AWS_BUCKET_NAME,
        Key:         `avatars/${fileName}`,
        Body:        req.file.buffer,
        ContentType: req.file.mimetype,
      };

      await s3.send(new PutObjectCommand(params));

      updateFields.avatar =
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${fileName}`;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, select: '-password' },
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Edit Profile Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error:   error.message,
    });
  }
};

export { getProfile, editProfile };