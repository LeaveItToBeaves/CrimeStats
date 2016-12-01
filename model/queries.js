"use strict";

var sql = require('sql');
sql.setDialect('mysql');
var mysql = require('mysql');
var config = require('../config/sqlConfig.json');
var crimes = sql.define({
    name: 'crimes',
    columns: ['Test', 'test1', 'test2', 'test3']
});

var query = crimes.select(crimes.star()).from(crimes).toQuery();

var connection = mysql.createConnection(config);
connection.connect();

connection.query(query);

