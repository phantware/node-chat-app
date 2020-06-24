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
  console.log('New connection');

  socket.emit('newEmail', {
    from: 'Ismail jamiu',
    text: 'Hey guy, how far',
    createdAt: new Date(),
  });

  socket.on('createEmail', function (newEmail) {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', function () {
    console.log('Connection lost');
  });
});

server.listen(port, console.log(`Server running on port: ${port}`));
