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

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on('disconnect', function () {
    console.log('CUser logged out');
  });
});

server.listen(port, console.log(`Server running on port: ${port}`));
