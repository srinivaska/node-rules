var User = require('./usermodel');
var conditions = require('./rules.json');




function getRules() {
  return [
    {
      condition: function(R) { 
        var getUserConditions = conditions[this.phase][this.command[0]];
        const keys = Object.keys(getUserConditions);

        if (keys.indexOf(this.user.smoke_count) != -1) {

            this.smoke_notif = true;
            this.smoke_notif_message = getUserConditions[this.user.smoke_count];
        }
        R.when(true);
      },
      consequence: function(R) {
        R.next();
      }
    },
    {
      condition: function(R) {
        var getUserConditions = conditions[this.phase][this.command[1]];
        const keys = Object.keys(getUserConditions);
        var days = '' + this.days;
        if (keys.indexOf(days) != -1) {
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
