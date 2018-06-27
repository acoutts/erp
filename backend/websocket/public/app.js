var socket = io.connect('http://localhost:8014');

socket.on('message', function(message) {
  console.log('The server has a message for you: ' + message);
})

socket.on('connect', (socket) => {
  document.getElementById("connectionStatus").innerHTML = "Connected";
});

socket.on('disconnect', (socket) => {
  document.getElementById("connectionStatus").innerHTML = "Disconnected";
});

socket.on('connect_error', (socket) => {
  document.getElementById("connectionStatus").innerHTML = "Connection Error";
});

socket.on('connect_timeout', (socket) => {
  document.getElementById("connectionStatus").innerHTML = "Connection Timeout";
});

socket.on('reconnect', (socket) => {

});

socket.on('reconnect_attempt', (socket) => {

});

socket.on('reconnecting', (socket) => {

});

socket.on('reconnect_error', (socket) => {

});

socket.on('reconnect_failed', (socket) => {

});

function priceDeltaHandler(_oldVal, _newVal) {
  var cls;
  if (_newVal > _oldVal) { cls = 'increase' }
  if (_newVal < _oldVal) { cls = 'decrease' }
  jQuery('#eosPriceRam').addClass(cls);

  setTimeout(() => {
    jQuery('#eosPriceRam').removeClass(cls);
  }, 700)
}

socket.on('update', (message) => {
  var oldVal = document.getElementById("eosPriceRam").innerHTML.substr(0, document.getElementById("eosPriceRam").innerHTML.indexOf(' '));
  priceDeltaHandler(oldVal, message);
  var target = document.getElementById("eosPriceRam");
  target.innerHTML = message + " EOS";
});

$('#poke').click(function () {
    socket.emit('message', 'Hi server, how are you?');
});
