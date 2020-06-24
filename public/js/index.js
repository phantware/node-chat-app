const socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('server disconnected');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
