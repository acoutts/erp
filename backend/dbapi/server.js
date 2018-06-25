//~ Import configurations
const env = process.env.NODE_ENV || 'development';
const config = require('./conf/config')[env];

//~ Setup server
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const massive = require('massive');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const limiter = new rateLimit({
  windowMs: 1000, //~ 1 second window
  max: 6, //~ Request limit for each IP per window
  delayMs: 0, //~ Full speed until max limit is reached
  message: 'Error: too many requests. Please try again later.'
})

//~ Connect to the DB
massive({
  host: config.database.host,
  port: config.database.port,
  database: config.database.dbname,
  user: config.database.user,
  password: config.database.password
}).then(db => {
  //~ Print if successful
  console.log("Initialized DB successfully");
  app.set('db', db);

  //~ Initialize controller
  var dbApiController = require('./controllers/dbApiController');

  //~ Middleware
  //~ Log requests to the console
  app.use(logger('dev'));
  app.use(helmet());
  app.use(limiter);

  //~ Parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  //~ For DEBUG only
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //~ Routing endpoints
  app.route('/v1/data/:days')
  .get(dbApiController.getData);

  app.route('/v1/data')
  .post(dbApiController.postData);

  app.route('/v1/data/custom/:reqDayRange/:reqIntervalMinutes')
  .get(dbApiController.getDataCustom);

  //~ Generic 404 error for invalid URIs
  app.get('*', function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
  app.post('*', function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

  //~ Launch the server
  app.listen(config.server.port);
  console.log('DB API RESTful API server started on: ' + config.server.port);
});

module.exports = app;
