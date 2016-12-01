var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/map', function(req, res, next) {
    var array = ['loc1', 'loc2'];
    res.render('map', {});
});

module.exports = router;
