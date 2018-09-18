var User = require('./usermodel');

function validate(R, context) {
  var flag = true;
  User.find({}, function(err, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].name == context.name && data[i].phone == context.phone) {
        flag = false;
        break;
      } 
    }
    R.when(flag);
  });
}

function getRules() {
  return [
    {
      condition: function(R) {
        validate(R,this);
      },
      consequence: function(R) {
        this.result = false;
        this.reason = 'The transaction was blocked, Username && phone numbers are invalid';
        R.stop();
      }
    }
  ];
}
module.exports.getRules = getRules;
