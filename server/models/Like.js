const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
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
}, { timestamps: true });

// Ensure one like per user per post
likeSchema.index({ user: 1, post: 1 }, { unique: true });

// Update post's likesCount when a like is saved
likeSchema.post('save', async function(doc) {
  await mongoose.model('Post').findByIdAndUpdate(doc.post, {
    $inc: { likesCount: 1 }
  });
});

// Update post's likesCount when a like is removed
likeSchema.post('remove', async function(doc) {
  await mongoose.model('Post').findByIdAndUpdate(doc.post, {
    $inc: { likesCount: -1 }
  });
});

module.exports = mongoose.model('Like', likeSchema);