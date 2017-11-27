var mongoose = require("mongoose");
var Question = require("./models/question");

Question.find({}, (err, questions) => {
  if (question.length == 0) {
    var questions = [
      new Question({
        question: 1,
        description: "Among all three students, who receives the lowest overall math score from these four tests?",
        option1: "Student A",
        option2: "Student B",
        option3: "Student C",
        option4: "Data is unclear",
        correctAnswer: "A"
      }),
      new Question({
        question: 2,
        description: "What is the approximate average math score for student B from these four tests?",
        option1: "25",
        option2: "45",
        option3: "65",
        option4: "85",
        correctAnswer: "C"
      }),
      new Question({
        question: 3,
        description: "Assume that all three students don't study during the year, which month of exam appears to be the most difficult test among all?",
        option1: "January",
        option2: "April",
        option3: "July",
        option4: "October",
        correctAnswer: "B"
      })
    ]

    questions.forEach((q) => {
      q.save();
    })

  }
})
