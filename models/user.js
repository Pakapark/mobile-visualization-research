var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  participantId: {type: String, require: true},
  firstName: String,
  lastName: String,
  gender: String,

  // Need to add answer sheet
})

module.exports = mongoose.model("User", UserSchema);
