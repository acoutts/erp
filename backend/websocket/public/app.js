var socket = io.connect('http://localhost:8014');

//var username = prompt("What's your username?");

//socket.emit('little_newbie', username);

socket.on('message', function(message) {
  console.log('The server has a message for you: ' + message);
})

socket.on('update', (message) => {
  console.log('message: ' + message);
})

$('#poke').click(function () {
    socket.emit('message', 'Hi server, how are you?');
})
