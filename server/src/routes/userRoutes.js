import express from 'express';
import multer from 'multer';
import { editProfile, getProfile } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router  = express.Router();
const upload  = multer({ storage: multer.memoryStorage() });

router.get('/profile',authMiddleware,getProfile);
router.put('/edit-profile', authMiddleware, upload.single('avatar'), editProfile);

export default router;