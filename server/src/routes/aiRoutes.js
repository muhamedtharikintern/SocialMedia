import express from 'express';
import {
  generateCaption,
  generateHashtags,
  debugAI,
} from '../controller/aiController.js';

const router = express.Router();

// ── Debug route — hit this first to diagnose issues ──
router.get('/debug', debugAI);

// ── Production routes ────────────────────────────────
router.post('/caption', generateCaption);
router.post('/hashtags', generateHashtags);

export default router;