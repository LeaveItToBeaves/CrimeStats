var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    res.render('test');
});

module.exports = router;
