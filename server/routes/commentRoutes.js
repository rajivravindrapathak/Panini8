const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getComments,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

router.route('/')
  .get(getComments)
  .post(protect, addComment);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;