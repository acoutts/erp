var socket = io.connect('http://localhost:8014');

//var username = prompt("What's your username?");

//socket.emit('little_newbie', username);

socket.on('message', function(message) {
  console.log('The server has a message for you: ' + message);
})

function priceIncrease() {
  jQuery('#eosPriceRam').addClass('increase');
  setTimeout(() => {
    jQuery('#eosPriceRam').removeClass('increase');
  }, 700);
}

function priceDecrease() {
  jQuery('#eosPriceRam').addClass('decrease');
  setTimeout(() => {
    jQuery('#eosPriceRam').removeClass('decrease');
  }, 700);
}

socket.on('update', (message) => {
  var oldVal = document.getElementById("eosPriceRam").innerHTML.substr(0, document.getElementById("eosPriceRam").innerHTML.indexOf(' '));
  //console.log("Oldval: " + oldVal);
  //console.log("NewVal: " + message);
  if (message > oldVal) {
    //~ console.log("INCREASE");
    priceIncrease();
  }
  else if (message < oldVal) {
    //~ console.log("DECREASE");
    priceDecrease();
  }
  var target = document.getElementById("eosPriceRam");
  target.innerHTML = message + " EOS";
  //~ console.log('Updated RAM Price: ' + message);
})

$('#poke').click(function () {
    socket.emit('message', 'Hi server, how are you?');
})
