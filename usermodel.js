var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  zip_code: String,
  phone: String,
  city: String,
  state: String,
  created_at: Date,
  phase: String,
  smoke_count: String
},{ collection: 'users' });

module.exports = mongoose.model('User', UserSchema);

