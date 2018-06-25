'use strict';

var app = require('../server');
var db = app.get('db');
var moment = require('moment');

//~ Setup date variables
const oneDayAgo = moment().utc().subtract(24, 'hour').format("YYYY-MM-DD HH:mm:ss.SSS");
const threeDaysAgo = moment().utc().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const sevenDaysAgo = moment().utc().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const fourteenDaysAgo = moment().utc().subtract(14, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const thirtyDaysAgo = moment().utc().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const ninetyDaysAgo = moment().utc().subtract(90, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const oneEightyDaysAgo = moment().utc().subtract(180, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
const oneYearAgo = moment().utc().subtract(365, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');

const intervals = {
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week'
};

module.exports = {

  getDataCustom: function(req, res) {
    const reqDayRange = req.params.reqDayRange;
    const reqMinuteInterval = req.params.reqIntervalMinutes;

    var timeFrom = moment().utc().subtract(reqDayRange, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
    var timeNow = moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS');

    var granularity;

    switch (reqMinuteInterval) {
      //~ 4 hour
      case "240":
        db.build_4h_candles(timeFrom, timeNow).then(results => {
          res.status(200).send(results);
        })
      break;

      //~ 1 day
      case "1440":
        granularity = intervals.DAY;
        db.build_candles(granularity, timeFrom, timeNow).then(results => {
          res.status(200).send(results);
        })
      break;

      //~ 1 week
      case "10080":
        granularity = intervals.WEEK;
        db.build_candles(granularity, timeFrom, timeNow).then(results => {
          res.status(200).send(results);
        })
      break;

      //~ Throw an error back if anything but 4h or 1d is passed in for the interval
      default:
        res.status(400).send("Error");
        break;
    }
  },

  //~ 'period' parameter specifies what range of data to return
  getData: function (req, res) {
    const getAllData = false;
    const days = req.params.days;
    if (days <1 || days == null )
    {
      //res.status(400).send("ERROR: Period must be at least 1");
      console.log("Error: period must be at least 1");
    }

    var granularity = days <= 3
    ? intervals.MINUTE
    : days <= 90
    ? intervals.HOUR
    : days <= 365
    ? intervals.DAY
    : intervals.WEEK;

    //~ Use daily candles for now until we have a lot more data to return
    //~ db.build_alldata_candles(day)......
    if (days == 'all')
      granularity = intervals.WEEK;

    //~ The 'start time' to be passed into the query for BETWEEN
    var timeFrom = moment().utc().subtract(days, 'day').format('YYYY-MM-DD HH:mm:ss.SSS');
    var timeNow = moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS');

    if (days == 'all') {
      db.build_alldata_candles(granularity).then(results => {
        res.status(200).send(results);
      })
    }
    else {
      db.build_candles(granularity, timeFrom, timeNow).then(results => {
        res.status(200).send(results);
      })
    }
  },

  //~ Generic DB insert function based on request body
  postData: function (req, res) {
    const timestamp = req.body.dt;
    const priceInEos = req.body.peos;
    const priceInUsd = req.body.pusd;

    db.eosram.insert({
      dt: timestamp,
      peos: priceInEos,
      pusd: priceInUsd
    }, {
      onConflictIgnore: true, //~ Skip insert if row exists
    }).then(result => {
      if (result == null) {
        res.status(400).json(
          {
            'data': {
              'dt': timestamp,
              'peos': priceInEos,
              'pusd': priceInUsd
            },
            'metadata': {
              'type': 'POST',
              'status': 'failed'
            }
          }
        );
      }
      else {
        res.status(200).json(
          {
            'data': {
              'dt': timestamp,
              'peos': priceInEos,
              'pusd': priceInUsd
            },
            'metadata': {
              'type': 'POST',
              'status': 'success'
            }
          }
        );
      }
    });
  },
}
