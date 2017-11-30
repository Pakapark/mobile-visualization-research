var mongoose = require("mongoose");

var PaperSchema = mongoose.Schema({
  userId: String,
  eval: [{
    visualization: String,
    question: Number,
    result: String,
    firstDecided: Number,
    lastDecided: Number,
    reluctance: Number,
    createdAt: Date
  }]
})

module.exports = mongoose.model("Paper", PaperSchema);
