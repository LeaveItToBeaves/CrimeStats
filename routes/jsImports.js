var express = require('express');
var router = express.Router();
var __dirname = 'views/js/';
var fs = require('fs');
var ejs = require('ejs');

router.get('/bootstrap.js', function(req, res, next) {
  res.sendFile('bootstrap.js', {root: __dirname});
});

router.get('/bootstrap.min.js', function(req, res, next) {
  res.sendFile('bootstrap.min.js', {root: __dirname});
});

router.get('/jquery.js', function(req, res, next) {
  res.sendFile('jquery.js', {root: __dirname});
});

router.get('/leaflet.js', function(req, res, next) {
  res.sendFile('leaflet.js', {root: __dirname});
});

router.get('/tracker.js', function(req, res, next) {
  res.sendFile('tracker.js', {root: __dirname});
});



module.exports = router;