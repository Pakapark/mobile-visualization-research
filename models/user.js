var mongoose = require('mongoose');

// Note that this schema does not design to optimize memory and query.
var UserSchema = mongoose.Schema({
  participantId: {type: String, require: true},
  firstName: String,
  lastName: String,
  gender: String,
  questionOrder: Object,
  device: String,
  devicePixelRatio: Number,
  screenHeight: Number,
  screenWidth: Number,
  createdAt: Date
})

module.exports = mongoose.model("User", UserSchema);
