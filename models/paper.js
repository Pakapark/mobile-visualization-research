var mongoose = require("mongoose");

var PaperSchema = mongoose.Schema({
  userId: String,
  examType: {type: String, enum: ["A", "B", "C"]},
  question: [{
    question: Number,
    answer: {type: String, enum: ["A", "B", "C", "D"]},
    firstTime: Number,
    lastTime: Number,
    createdAt: Date
  }],
})

module.exports = mongoose.model("Paper", PaperSchema);
