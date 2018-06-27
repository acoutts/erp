var socket = io.connect('http://localhost:8014');

//var username = prompt("What's your username?");

//socket.emit('little_newbie', username);

socket.on('message', function(message) {
  console.log('The server has a message for you: ' + message);
})

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
  //~ console.log('Updated RAM Price: ' + message);
})

$('#poke').click(function () {
    socket.emit('message', 'Hi server, how are you?');
})
