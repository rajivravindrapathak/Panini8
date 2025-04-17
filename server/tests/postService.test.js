const request = require('supertest');
const app = require('../app');
const Post = require('../models/Post');
const User = require('../models/User');

let authToken;
let testUser;
let testPost;

beforeAll(async () => {
  // Create test user
  testUser = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });

  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  
  authToken = res.body.token;

  // Create test post
  testPost = await Post.create({
    title: 'Test Post',
    content: 'This is a test post',
    author: testUser._id
  });
});

afterAll(async () => {
  await Post.deleteMany();
  await User.deleteMany();
});

describe('Post API', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'New Post',
        content: 'Post content',
        tags: 'test,example'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('New Post');
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/api/posts');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.posts)).toBeTruthy();
  });

  // Add more tests for update, delete, etc.
});