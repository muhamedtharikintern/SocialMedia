import express from 'express';
import {generateCaption,generateHashtags,} from'../controller/aiController.js';
const router =express.Router();

router.post(
  '/caption',
  generateCaption,
);

router.post(
  '/hashtags',
  generateHashtags,
);

export default router;