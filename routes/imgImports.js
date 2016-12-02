var express = require('express');
var router = express.Router();
var __dirname = 'views/img/';

router.get('/ipad.png', function(req, res, next) {
  res.sendFile('ipad.png', {root: __dirname});
});

router.get('/dog.png', function(req, res, next) {
  res.sendFile('dog.png', {root: __dirname});
});

router.get('/world.jpg', function(req, res, next) {
  res.sendFile('world.jpg', {root: __dirname});
});

router.get('/CrimeTapeSmall.jpg', function(req, res, next) {
  res.sendFile('CrimeTapeSmall.jpg', {root: __dirname});
});

router.get('/images/meowth.png', function(req, res, next) {
  res.sendFile('images/meowth.png', {root: __dirname});
});

module.exports = router;