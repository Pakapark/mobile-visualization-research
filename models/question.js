var mongoose = require('mongoose');

// Note that this schema does not design to optimize memory and query.
var QuestionSchema = mongoose.Schema({
  question: Number,
  description: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  correctAnswer: {type: String, enum: ["A","B","C","D"]}
})

module.exports = mongoose.model("Question", QuestionSchema);
