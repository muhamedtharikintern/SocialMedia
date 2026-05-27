import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controller/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post( '/posts', upload.single('file'),authMiddleware,uploadImage);


export default router;