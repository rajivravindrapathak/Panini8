const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const { tag, search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  
  let query = {};
  
  if (tag) {
    query.tags = tag;
  }
  
  if (search) {
    query.$text = { $search: search };
  }
  
  const posts = await Post.find(query)
    .populate('author', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Post.countDocuments(query);
  
  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username avatar bio')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username avatar'
      }
    });
    
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  res.json(post);
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  
  const post = await Post.create({
    title,
    content,
    tags: tags.split(',').map(tag => tag.trim()),
    author: req.user._id
  });
  
  res.status(201).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }
  
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : post.tags;
  post.updatedAt = Date.now();
  
  const updatedPost = await post.save();
  
  res.json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }
  
  await post.remove();
  
  res.json({ message: 'Post removed' });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};