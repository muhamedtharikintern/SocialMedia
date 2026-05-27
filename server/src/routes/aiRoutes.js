const express = require('express');

const router = express.Router();

const {
  generateCaption,
  generateHashtags,
} = require('../controllers/aiController');

router.post(
  '/caption',
  generateCaption,
);

router.post(
  '/hashtags',
  generateHashtags,
);

module.exports = router;