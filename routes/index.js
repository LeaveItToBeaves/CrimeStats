var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php
var model = require('../model/queries');
router.get('/', function(req, res, next) {
    let array = model.getAllLocs();
    res.render('index', { title: array });
});

router.get('/map', function(req, res, next) {
    var array = ['loc1', 'loc2'];
    res.render('map', {});
});

module.exports = router;
