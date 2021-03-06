// const message = require('../../server/utils/message');

const socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');
});
socket.on('disconnect', function () {
  console.log('server disconnected');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank>My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('$messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('[name=message]').val(),
    },
    function () {}
  );
});

let locationButton = $('#send-location');
locationButton.on('click', function (position) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(
    function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function () {
      alert('Unable to fetch location ');
    }
  );
});
