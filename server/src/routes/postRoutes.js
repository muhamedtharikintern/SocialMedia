import express     from 'express';
import { createPost } from '../controller/postController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/post-create',authMiddleware, createPost);

export default router;