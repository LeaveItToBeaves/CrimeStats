var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php
var __dirnameViews = 'views/';
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    res.render('test');
});

router.get('/script', function(req, res, next) {
  res.render('map', {name: "Crime Statistics Map"});
});


router.get('/images/meowth.png', function(req, res, next) {
  res.sendFile('js/css/images/meowth.png', {root: __dirnameViews});
});



module.exports = router;


