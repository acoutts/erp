'use strict';

//~ Import configurations
const env = process.env.NODE_ENV || 'development';
const config = require('../conf/config')[env];
const request = require('request');
const dbapiurl = 'http://' + config.dbapi.host + ':' + config.dbapi.port;

module.exports = {

  //~ Custom resolution data
  getRamCustom: function(req, res) {
    const reqDayRange = req.params.reqDayRange;
    const reqMinuteInterval = req.params.reqIntervalMinutes;
    request(dbapiurl + '/v1/ram/custom/' + reqDayRange + '/' + reqMinuteInterval, { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 1 day resolution
  getRam1d: function(req, res) {
    request(dbapiurl + '/v1/ram/1', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 3 day resolution
  getRam3d: function(req, res) {
    request(dbapiurl + '/v1/ram/3', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 7 day resolution
  getRam7d: function(req, res) {
    request(dbapiurl + '/v1/ram/7', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 14 day resolution
  getRam14d: function(req, res) {
    request(dbapiurl + '/v1/ram/14', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 30 day resolution
  getRam30d: function(req, res) {
    request(dbapiurl + '/v1/ram/30', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 90 day resolution
  getRam90d: function(req, res) {
    request(dbapiurl + '/v1/ram/90', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 180 day resolution
  getRam180d: function(req, res) {
    request(dbapiurl + '/v1/ram/180', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ 365 day resolution
  getRam365d: function(req, res) {
    request(dbapiurl + '/v1/ram/365', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  },

  //~ All data
  getRamAll: function(req, res) {
    request(dbapiurl + '/v1/ram/all', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(resi.statusCode).send(body);
    })
  }
}
