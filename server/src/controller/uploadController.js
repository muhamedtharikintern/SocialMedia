import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3.js';
import dotenv from 'dotenv'

const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const fileName =
      `${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `posts/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(
      new PutObjectCommand(params)
    );

    const fileUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/posts/${fileName}`;

    return res.status(200).json({
      success: true,
      url: fileUrl,
    });

  } catch (error) {
    console.error('Upload Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Upload Failed',
      error: error.message,
    });
  }
};

export { uploadImage };