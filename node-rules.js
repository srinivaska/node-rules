var User = require('./usermodel');
var conditions = require('./rules.json');



function getRules() {
  return [
    {
      condition: function(R) {
        var getUserConditions = conditions[this.phase][this.command];
        const keys = Object.keys(getUserConditions);
        var days = "" + this.days;
        if(keys.indexOf(days) != -1){
            this.response = getUserConditions[days];
            this.username = this.user.name;
            R.when(false);
        }else{
            R.when(true);
        }
      },
      consequence: function(R) {
        this.result = false;
        R.stop();
      }
    }
  ];
}
module.exports.getRules = getRules;
