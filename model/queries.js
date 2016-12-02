"use strict";

var config = require('../config/sqlConfig.json');
var sql = require('sql');
sql.setDialect('mysql');
var crimeQueries = sql.define({
  name: 'CrimeStatsTable',
  columns: [
    'Date.Rptd',
    'DR.NO',
    'DATE.OCC',
    'TIME.OCC',
    'AREA',
    'AREA.NAME',
    'RD',
    'Crm.Cd',
    'CrmCd.Desc',
    'Status',
    'Status.Desc',
    'LOCATION',
    'Cross.Street',
    'Location.1'
  ]
})
var mysql = require('mysql');
var crimes = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
// crimes.connect(function(err){
//   if(err){
//     console.log("Error connecting to Db");
//     console.log(err);
//     return;
//   }
//   console.log('Connection established');
//   var query = crimeQueries.select(crimeQueries['Location.1']).from(crimeQueries).toQuery();
//   console.log(query);
//   crimes.query(query.text, function(err, rows){
//     if(err) throw err;
//     console.log('data received');
//     console.log(rows[1]);
//   });
// });
crimes.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    console.log(err);
    return;
  }
  console.log('Connection established');
});

module.exports = {
  getAllLocs: function(res){
    let locs = [];
    let query = crimeQueries.select(crimeQueries['Location.1']).from(crimeQueries).toQuery();
    console.log(query);
    crimes.query(query.text, function(err, rows){
      if(err) throw err;
      console.log('data received');
      for(let row of rows){
        let num = row['Location.1'];
        let lat = parseFloat(num.substring(num.lastIndexOf('(')+1, num.lastIndexOf(',')));
        let long = parseFloat(num.substring(num.lastIndexOf(',')+1, num.lastIndexOf(')')));
        locs.push([lat, long])
      }
      res.render('index', { title: locs });
    });
  }
};



