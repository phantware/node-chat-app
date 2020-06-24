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
io.on('connection', function (socket) {
  console.log('New user connected');

  socket.on('createMessage', function (message) {
    console.log('createMessage', message);

    // Admin welcome new user
    socket.emit('newMessage', {
      from: 'Admin',
      message: 'Welcome to the chat app',
      createdAt: new Date().getTime(),
    });

    // Admin send message to all users about the new user that joined
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      message: 'New user joined',
      createdAt: new Date().getTime(),
    });

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime(),
    // });
  });

  socket.on('disconnect', function () {
    console.log('CUser logged out');
  });
});

server.listen(port, console.log(`Server running on port: ${port}`));
