var express = require('express');
var router = express.Router();
var __dirname = 'views/js/css/';

router.get('/leaflet.css', function(req, res, next) {
  res.sendFile('leaflet.css', {root: __dirname});
});

router.get('/bootstrap.css', function(req, res, next) {
  res.sendFile('bootstrap.css', {root: __dirname});
});

router.get('/images/marker-icon.png', function(req, res, next) {
  res.sendFile('images/marker-icon.png', {root: __dirname});
});

router.get('/images/marker-shadow.png', function(req, res, next) {
  res.sendFile('images/marker-shadow.png', {root: __dirname});
});

router.get('/images/meowth.png', function(req, res, next) {
  res.sendFile('images/meowth.png', {root: __dirname});
});

module.exports = router;
