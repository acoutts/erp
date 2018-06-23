//~ Import configurations
var config = require('./conf/config');

//~ Setup server
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const limiter = new rateLimit({
  windowMs: 1000, //~ 1 second window
  max: 2, //~ Limit each IP to 3 requests per window
  delayMs: 0, //~ Full speed until max limit is reached
  message: 'Error: too many requests. Please try again later.'
})


//~ Initialize controller
var publicApiController = require('./controllers/publicApiController');

//~ Middleware
//~ Log requests to the console
app.use(logger('dev'));
app.use(helmet());
app.use(limiter);

//~ Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//~ For DEBUG only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//~ ideas:
//~ - have a generic function to get 1d, 3d, 7d, etc of data from any table
//~ - have a separate controller for each resource (ram, cpu, net)
//~ - have the controller call the library function to access the db

//~ Routing endpoints
app.get('/v1/ram/1', publicApiController.getRam1d); //~ last day of data
app.get('/v1/ram/3', publicApiController.getRam3d); //~ last 3 days of data
app.get('/v1/ram/7', publicApiController.getRam7d); //~ last week of data
app.get('/v1/ram/14', publicApiController.getRam14d); //~ last 2 weeks of data
app.get('/v1/ram/30', publicApiController.getRam30d); //~ last month of data
app.get('/v1/ram/90', publicApiController.getRam90d); //~ last 3 mo of data
app.get('/v1/ram/180', publicApiController.getRam180d); //~ last 6 mo of data
app.get('/v1/ram/365', publicApiController.getRam365d); //~ Last 1 year of data
app.get('/v1/ram/all', publicApiController.getRamAll); //~ Return daily resolution for all datapoints

//~ Generic 404 error for invalid URIs
app.get('*', function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

//~ Launch the server
app.listen(config.server.port);
console.log('Public API RESTful API server started on: ' + config.server.port);

module.exports = app;
