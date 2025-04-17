const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  toggleLike,
  getLikes
} = require('../controllers/likeController');

router.route('/')
  .get(getLikes);

router.route('/:postId')
  .post(protect, toggleLike);

module.exports = router;