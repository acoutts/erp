const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

//~ Serve files in /public/ folder
app.use(express.static('public'));

var oldPrice;
var ramPriceEos;

function updatePrice () {
  //~ Update EOS USD Price first
  request('https://api.coinmarketcap.com/v2/ticker/1765/', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    var eosPriceUsd = body.data.quotes.USD.price;

    //~ Get ram market data next
    var data = '{"json":true, "code":"eosio", "scope":"eosio", "table":"rammarket", "limit":10}';
    var json_obj = JSON.parse(data);
    request({
      url: 'https://api.eosnewyork.io/v1/chain/get_table_rows',
      method: "POST",
      json: json_obj
    }, function(error, response, body){
      var ramBaseBalance = body.rows[0].base.balance; // Amount of RAM bytes in use
      ramBaseBalance = ramBaseBalance.substr(0,ramBaseBalance.indexOf(' '));
      var ramQuoteBalance = body.rows[0].quote.balance; // Amount of EOS in the RAM collector
      ramQuoteBalance = ramQuoteBalance.substr(0,ramQuoteBalance.indexOf(' '));
      ramPriceEos = ((ramQuoteBalance / ramBaseBalance) * 1024).toFixed(8); // Price in kb
      ramPriceUsd = ramPriceEos * eosPriceUsd;

      if (oldPrice != ramPriceEos) {
        io.emit('update', ramPriceEos);
        oldPrice = ramPriceEos;
      }
    });
  });
}

setInterval(() => {
  updatePrice();
}, 500);

http.listen(8014, function() {
  console.log('listening on port 8014');

  // When a client connects, we note it in the console
  io.sockets.on('connection', function (socket) {
    //~ Send current price to the cient that just connected
    socket.emit('update', ramPriceEos);
    socket.emit('message', "You are connected!");
    socket.broadcast.emit('message', "Another client has just connected");


    socket.on('message', function (message) {
      console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
    })

    socket.on('little_newbie', function(username) {
      socket.username = username;
    })
  });
});
