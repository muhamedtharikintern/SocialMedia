import User from '../models/User.js';
import { uploadToS3 } from '../config/s3.js'; 

 const editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, username, bio, phone, gender, website } = req.body;

    const updateFields = {};
    if (name)     updateFields.name     = name;
    if (username) updateFields.username = username;
    if (bio)      updateFields.bio      = bio;
    if (phone)    updateFields.phone    = phone;

    // if a new avatar was uploaded, it comes via multer as req.file
    if (req.file) {
      const avatarUrl = await uploadToS3(req.file, 'avatars');
      updateFields.avatar = avatarUrl;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, select: '-password' }
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {editProfile,getProfile};