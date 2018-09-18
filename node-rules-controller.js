var Rules = require('./node-rules');
var mongoose = require('mongoose');
var User = require('./usermodel');
var conditions = require('./rules.json');

var RuleEngine = require('node-rules');
var R = new RuleEngine();

function executeRule(RULE_COMMANDS) {


  User.find({}, function(err, user) {
    for (var i = 0; i < user.length; i++) {
 
      //var getUserConditions = conditions[user[i].phase][RULE_COMMAND];
      var oneDay = 24*60*60*1000;
      var createdDate = new Date(user[i].created_at);
      var diffDays = Math.round(Math.abs((createdDate.getTime() - new Date().getTime())/(oneDay)));

      var fact = {
        "phase":user[i].phase,
        "command":RULE_COMMANDS,
        "days":diffDays,
        "user":user[i]
      }

      var rules = Rules.getRules();
      R.register(rules);

      R.execute(fact, function(data) {
       
        if (data.result) {
          console.log("Sending Notification to ".green  + data.username+"  :".red + data.response);      
        }

        if(data.smoke_notif){
          console.log("Smoke Notification : ".green + data.smoke_notif_message);
          console.log("======END======");
        }
      });


    }
  })
}



  

module.exports.executeRule = executeRule;
