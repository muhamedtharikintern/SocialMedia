import express from 'express';
import {
  generateCaption,
  generateHashtags,
  debugAI,
  generateCaptionFromImage,
} from '../controller/aiController.js';

const router = express.Router();

// ── Debug route — hit this first to diagnose issues ──
router.get('/debug', debugAI);

// ── Production routes ────────────────────────────────
router.post('/caption', generateCaption);
router.post('/hashtags', generateHashtags);
router.post('/caption-from-image',upload.single('image'), generateCaptionFromImage);

export default router;