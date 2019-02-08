var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  business_category: String,
  annual_income : Number,
  username: String,
  password: String,
  email: String,
  tel: String,
});
module.exports = mongoose.model('BusinessUser', UserSchema);
