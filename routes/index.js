"use strict";
var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php
var __fontdirname = 'views/';
var model = require('../model/queries');
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/map', function(req, res, next) {
    model.getAllLocs(res);
});

router.get('/font-awesome/css/font-awesome.min.css', function(req, res, next) {
  res.sendFile('views/font-awesome/css/font-awesome.min.css', {root: __fontdirname});
});


module.exports = router;
