"use strict";

var config = require('../config/sqlConfig.json');
var sql = require('sql');
sql.setDialect('mysql');
var mysql = require('mysql');
var crimes = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
crimes.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    console.log(err);
    return;
  }
  console.log('Connection established')
});


// var query = crimes.select(crimes.star()).from(crimes).toQuery();

