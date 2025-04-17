const app = require('./app');
const http = require('http');
const { setupSocket } = require('./socket');

const server = http.createServer(app);

// Set up Socket.io
setupSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});