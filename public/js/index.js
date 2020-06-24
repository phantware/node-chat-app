const socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
  socket.emit('createEmail', {
    to: 'jainjanet@gmail.com',
    text: 'Baba how far, I no hear from you na',
  });
});
socket.on('disconnect', function () {
  console.log('server disconnected');
});

socket.on('newEmail', function (email) {
  console.log('New email sent', email);
});
