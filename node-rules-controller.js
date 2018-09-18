var Rules = require('./node-rules');
var mongoose = require('mongoose');
var User = require('./usermodel');

var RuleEngine = require('node-rules');
var R = new RuleEngine();

function executeRules() {
  var rules = Rules.getRules();
  R.register(rules);


  // fact one

  var fact = {
    "name": 'sk',
    "phone": '8987676767'
  };

  R.execute(fact, function(data) {
    if (data.result) {
      console.log("Valid transaction".green);      
    } else {
      console.log('Blocked Reason:'.red + data.reason);
    }
  });


  // fact two 

  var fact2 = {
    "name": 'Pk',
    "phone": '8987676767'
  };


  
  R.execute(fact2, function(data) {
    if (data.result) {
      console.log("Valid transaction".green);      
    } else {
      console.log('Blocked Reason:'.red + data.reason);
    }
  });
}

module.exports.executeRules = executeRules;
