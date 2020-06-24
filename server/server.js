const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const publicPath = path.join(__dirname, '../public');

// Port
const port = process.env.PORT || 3000;

// Create http server and Initializing socket io
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(publicPath));

//  Greeting endpoint
io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('disconnect', () => {
    console.log('Connection lost');
  });
});

server.listen(port, console.log(`Server running on port: ${port}`));
