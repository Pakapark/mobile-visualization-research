var mongoose = require("mongoose");
var Question = require("./models/question");

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
  }),
  new Question({
    question: 4,
    description: "Which city has the warmest temperature throughout the year?",
    option1: "City A",
    option2: "City B",
    option3: "City C",
    option4: "Data is unclear",
    correctAnswer: "B"
  }),
  new Question({
    question: 5,
    description: "Which city has the largest change in temperature in 2016?",
    option1: "City A",
    option2: "City B",
    option3: "City C",
    option4: "Data is unclear",
    correctAnswer: "C"
  }),
  new Question({
    question: 6,
    description: "Which statement is correct about the temperature from June 1 to September 1 in three cities?",
    option1: "City B is always warmer than City C",
    option2: "City B is always cooler than City A",
    option3: "City A is always warmer than City C",
    option4: "City A is always cooler than City B",
    correctAnswer: "D"
  })
]

questions.forEach((q) => {
  q.save();
})
