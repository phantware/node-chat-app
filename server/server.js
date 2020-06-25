const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const { generateMessage, generateLocationMessage } = require('./utils/message');
const message = require('./utils/message');

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

  io.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  );

  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', function () {
    console.log('CUser logged out');
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateLocationMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit(
      'newLocationMessage',
      generateMessage('Admin', coords.latitude, coords.longitude)
    );
  });
});

server.listen(port, console.log(`Server running on port: ${port}`));
