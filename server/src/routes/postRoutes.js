import express     from 'express';
import { createPost,getUserPosts,getAllPosts } from '../controller/postController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/post-create',authMiddleware, createPost);
router.get('/my-posts', authMiddleware, getUserPosts);
router.get('/feed',authMiddleware,getAllPosts);


export default router;