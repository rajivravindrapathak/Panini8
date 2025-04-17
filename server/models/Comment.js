const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update post's commentsCount when a comment is saved
commentSchema.post('save', async function(doc) {
  await mongoose.model('Post').findByIdAndUpdate(doc.post, {
    $inc: { commentsCount: 1 }
  });
});

// Update post's commentsCount when a comment is removed
commentSchema.post('remove', async function(doc) {
  await mongoose.model('Post').findByIdAndUpdate(doc.post, {
    $inc: { commentsCount: -1 }
  });
});

module.exports = mongoose.model('Comment', commentSchema);