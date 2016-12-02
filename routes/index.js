"use strict";
var express = require('express');
var router = express.Router();
var __dirname = 'routes/phpviews/'; //testing with php
var model = require('../model/queries');
router.get('/', function(req, res, next) {
    model.getAllLocs(res);
});

router.get('/map', function(req, res, next) {
    model.getAllLocs(res);
});

module.exports = router;
