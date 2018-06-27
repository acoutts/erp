var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
/*
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})*/

function updateRam(socket) {
  setInterval( () => {
    //console.log("Test!");
    socket.broadcast.emit('update', 'New Update ');
  }, 1000);
}

http.listen(8014, function() {
  console.log('listening on port 8014');

  // When a client connects, we note it in the console
  io.sockets.on('connection', function (socket) {
      socket.emit('message', "You are connected!");
      socket.broadcast.emit('message', "Another client has just connected");
      updateRam(socket);

      socket.on('message', function (message) {
        console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
      })

      socket.on('little_newbie', function(username) {
        socket.username = username;
      })
  });
});
