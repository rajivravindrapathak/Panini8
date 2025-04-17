const socketio = require('socket.io');

let io;

const setupSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Join room for specific post
    socket.on('joinPost', (postId) => {
      socket.join(postId);
    });

    // Handle comment events
    socket.on('comment', (data) => {
      io.to(data.postId).emit('newComment', data.comment);
    });

    // Handle like events
    socket.on('like', (data) => {
      io.to(data.postId).emit('updateLikes', data.likesCount);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { setupSocket, getIO };