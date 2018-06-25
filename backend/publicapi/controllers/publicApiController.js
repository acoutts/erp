'use strict';

//~ Import configurations
const env = process.env.NODE_ENV || 'development';
const config = require('../conf/config')[env];

var app = require('../server');
const request = require('request');
const dbapiurl = 'http://' + config.dbapi.host + ':' + config.dbapi.port;

module.exports = {

  //~ 1 day resolution
  getRam1d: function(req, res) {
    request(dbapiurl + '/v1/data/1', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 3 day resolution
  getRam3d: function(req, res) {
    request(dbapiurl + '/v1/data/3', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 7 day resolution
  getRam7d: function(req, res) {
    request(dbapiurl + '/v1/data/7', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 14 day resolution
  getRam14d: function(req, res) {
    request(dbapiurl + '/v1/data/14', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 30 day resolution
  getRam30d: function(req, res) {
    request(dbapiurl + '/v1/data/30', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 90 day resolution
  getRam90d: function(req, res) {
    request(dbapiurl + '/v1/data/90', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 180 day resolution
  getRam180d: function(req, res) {
    request(dbapiurl + '/v1/data/180', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ 365 day resolution
  getRam365d: function(req, res) {
    request(dbapiurl + '/v1/data/365', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  },

  //~ All data
  getRamAll: function(req, res) {
    request(dbapiurl + '/v1/data/all', { json: true }, (err, resi, body) => {
      if (err) { return console.log(err); }
      res.status(200).send(body);
    })
  }
}
