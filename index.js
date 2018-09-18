//Load express module with `require` directive
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./usermodel');
var RuleEngine =  require('node-rules');
var colors = require('colors');
var Rules = require('./node-rules-controller');

//Define request response in root URL (/)
app.get('/', function(req, res) {
  res.send("hello");
});

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

var db = mongoose.connection;
db.on('error', () => {
  console.log('---FAILED to connect to mongoose');
});
db.once('open', () => {
  console.log('+++Connected to mongoose');
});


const CronJob = require('cron').CronJob;

console.log('Before job instantiation');
const job = new CronJob('*/1 * * * *', function() {
	const d = new Date();
  console.log('Every One Minute:', d);
  Rules.executeRule(["USER_SMOKE_NOTIFICATIONS","USER_DAYS"]);
});

console.log('After job instantiation');
job.start();



//Launch listening server on port 8081
app.listen(8081, function() {
  console.log('app listening on port 8081!');
});
