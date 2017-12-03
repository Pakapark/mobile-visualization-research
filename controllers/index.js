var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');
var Paper = require('../models/paper');
var dataGenerator = require('../utils/dataGenerator');
const movies = ["The Cooking Wizard", "The Light Horse", "Galaxy Battle", "Merriam: The King of Cat", "Curry Potter"];

function makeid() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function randomTest() {
  var possible = "ABC";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shuffle1(array){
  var random1 = Math.random(),
      random2 = Math.random(),
      random3 = Math.random();

  if (random1 > 0.5){
    if (random2 > 0.5){
      if (random3 > 0.5) return array;
      return [array[0], array[1], array[3], array[2]];
    } else {
      if (random3 > 0.5) return [array[1], array[0], array[2], array[3]];
      return [array[1], array[0], array[3], array[2]];
    }
  } else {
    if (random2 > 0.5){
      if (random3 > 0.5) return [array[2], array[3], array[0], array[1]];
      return [array[2], array[3], array[1], array[0]];
    } else {
      if (random3 > 0.5) return [array[3], array[2], array[0], array[1]];
      return [array[3], array[2], array[1], array[0]];
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getQuestionOrder(c){
  var remainder = c % 8;
  if (remainder == 0) return {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10}; // W, B-S, B-MS, S-S, S-MS
  if (remainder == 1) return {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 9, 8: 10, 9: 7, 10: 8}; // W, B-S, B-MS, S-MS, S-S
  if (remainder == 2) return {1: 1, 2: 2, 3: 5, 4: 6, 5: 3, 6: 4, 7: 7, 8: 8, 9: 9, 10: 10}; // W, B-MS, B-S, S-S, S-MS
  if (remainder == 3) return {1: 1, 2: 2, 3: 5, 4: 6, 5: 3, 6: 4, 7: 9, 8: 10, 9: 7, 10: 8}; // W, B-MS, B-S, S-MS, S-S
  if (remainder == 4) return {1: 1, 2: 2, 3: 7, 4: 8, 5: 9, 6: 10, 7: 3, 8: 4, 9: 5, 10: 6}; // W, S-S, S-MS, B-S, B-MS
  if (remainder == 5) return {1: 1, 2: 2, 3: 7, 4: 8, 5: 9, 6: 10, 7: 5, 8: 6, 9: 3, 10: 4}; // W, S-S, S-MS, B-MS, B-S
  if (remainder == 6) return {1: 1, 2: 2, 3: 9, 4: 10, 5: 7, 6: 8, 7: 3, 8: 4, 9: 5, 10: 6}; // W, S-MS, S-S, B-S, B-MS
  return {1: 1, 2: 2, 3: 9, 4: 10, 5: 7, 6: 8, 7: 5, 8: 6, 9: 3, 10: 4}
}

function getRamdomNumber(min, max) {
  return Math.random()*(max - min) + min;
}

exports.getIndexRedirect = (req, res) => {
  res.redirect("/");
}

exports.getIndex = (req, res) => {
  res.render('index');
}

exports.getConsent = (req, res) => {
  var participantId, query, found = true;
  participantId = makeid();
  User.find({participantId: participantId}, (err, users) => {
    if (users.length > 0) res.redirect('/consent');
  }).limit(1)
  res.render('consent', { participantId: participantId });
}

exports.postInfo = (req, res) => {
  if (!req.body.hasOwnProperty('participantId')) return res.redirect("/");
  var newUser = new User({ participantId: req.body.participantId, createdAt: Date.now(), device: req.device.type, screenWidth: parseInt(req.body.screenWidth, 10), screenHeight: parseInt(req.body.screenHeight, 10), devicePixelRatio: parseInt(req.body.screenRatio, 10)});
  console.log(req.device.type, req.body.screenWidth, req.body.screenHeight, req.body.screenRatio);
  newUser.save();
  res.render('info', { participantId: req.body.participantId });
}

exports.getExperiment = (req, res) => {
  res.render('experiment');
}

exports.postExperiment = (req, res) => {

  User.find({participantId: req.body.participantId}, (err, users) => {

    if (users.length == 0) res.redirect("/");

    Paper.count({}, (err, count) => {
      users[0].firstName = req.body.firstname;
      users[0].lastName = req.body.lastname;
      users[0].gender = req.body.gender;
      users[0].questionOrder = getQuestionOrder(count);
      users[0].createdAt = Date.now();

      users[0].markModified("questionOrder");
      users[0].save();

      res.render('experiment', { participantId: req.body.participantId });
    })
  }).limit(1)
}

function updatePaper(body, question, viz){
  Paper.find({userId: body.participantId}, (err, papers) => {
    var answer = {
      visualization: viz,
      question: question % 2 == 1 ? 1 : 2,
      result: body.result,
      firstDecided: body.firstTime,
      lastDecided: body.lastTime,
      reluctance: body.reluctance,
      createdAt: Date.now()
    }

    if (papers.length == 0) {
      var newPaper = new Paper({
        userId: body.participantId,
        eval: [answer]
      });
      newPaper.save();
    } else {
      papers[0].eval.push(answer);
      papers[0].save();
    }
  }).limit(1)
}

function decimal2(num){
  return parseInt(100*num)/100;
}

function getOptions(dataOption, data, question){
  var possibleAnswers = [
    "A (red) is generally greater than B (blue); both of them are increasing over time",
    "A (red) is generally less than B (blue); both of them are increasing over time",
    "A (red) is generally equal to B (blue); both of them are increasing over time",
    "A (red) is generally greater than B (blue); both of them are decreasing over time",
    "A (red) is generally less than B (blue); both of them are decreasing over time",
    "A (red) is generally equal to B (blue); both of them are decreasing over time",
    "A (red) is increasing over time; B (blue) is decreasing over time",
    "A (red) is decreasing over time; A (red) is increasing over time"
  ]
  var result = {}

  // First question: What is the relationship between A and B?
  if (question % 2 == 1){
    if (dataOption % 3 == 0){
      result["options"] = shuffle1([possibleAnswers[2], possibleAnswers[5], possibleAnswers[6], possibleAnswers[7]]);
    } else if (dataOption < 6) {
      result["options"] = shuffle1([possibleAnswers[0], possibleAnswers[1], possibleAnswers[3], possibleAnswers[4]]);
    } else if (Math.random() > 0.5) {
      result["options"] = shuffle1([possibleAnswers[0], possibleAnswers[1], possibleAnswers[6], possibleAnswers[7]]);
    } else {
      result["options"] = shuffle1([possibleAnswers[3], possibleAnswers[4], possibleAnswers[6], possibleAnswers[7]]);
    }
    result["correctAnswer"] = result["options"].indexOf(possibleAnswers[dataOption - 1]);

  } else {
    // Second question: What is the difference between the highest value from A at all time and the highest value from B at all time?
    var maxA = 0;
    var maxB = 0;
    var optionGap = 0.3;
    for (var timeframe = 0; timeframe < data.length; timeframe++) {
      for (var movie = 0; movie < data[timeframe].length; movie++) {
        maxA = Math.max(maxA, data[timeframe][movie][0]);
        maxB = Math.max(maxB, data[timeframe][movie][1]);
      }
    }

    var correctAnswer = decimal2(Math.abs(maxA - maxB));
    if (correctAnswer < optionGap){
      result["options"] = [decimal2(correctAnswer), decimal2(correctAnswer + optionGap), decimal2(correctAnswer + 2*optionGap), decimal2(correctAnswer + 3*optionGap)];
    } else if (correctAnswer < 2*optionGap){
      if (Math.random() > 0.5) result["options"] =  [decimal2(correctAnswer), decimal2(correctAnswer + optionGap), decimal2(correctAnswer + 2*optionGap), decimal2(correctAnswer + 3*optionGap)];
      else result["options"] = [decimal2(correctAnswer - optionGap), decimal2(correctAnswer), decimal2(correctAnswer + optionGap), decimal2(correctAnswer + 2*optionGap)];
    } else if (correctAnswer < 3*optionGap){
      var randomNumber = Math.random();
      if (randomNumber < 0.33) result["options"] =  [decimal2(correctAnswer), decimal2(correctAnswer + optionGap), decimal2(correctAnswer + 2*optionGap), decimal2(correctAnswer + 3*optionGap)];
      else if (randomNumber < 0.66) result["options"] = [decimal2(correctAnswer - optionGap), decimal2(correctAnswer), decimal2(correctAnswer + optionGap), decimal2(correctAnswer + 2*optionGap)];
      else result["options"] = [decimal2(correctAnswer - 2*optionGap), decimal2(correctAnswer - optionGap), decimal2(correctAnswer), decimal2(correctAnswer + optionGap)];
    } else {
      result["options"] = [];
      var randomChoice = getRandomInt(0, 4);
      for (var i = 0; i < 4; i++)
        result["options"].push(decimal2(correctAnswer + (i - randomChoice)*optionGap));
    }
    result["correctAnswer"] = result["options"].indexOf(correctAnswer);
  }
  return result;
}

exports.postExperimentQuestion = (req, res) => {
  User.find({participantId: req.body.participantId}, (err, users) => {
    if (users.length == 0) return res.redirect("/");
    var question_param = parseInt(req.params.question);
    var question = users[0].questionOrder[question_param];
    var question_description = [
      "What is the relationship between A (red) and B (blue)?",
      "Pick the highest point value across all time/plots for A (red). Pick the highest point value across all time/plots for B (blue). Compute the difference."
    ];
    var visualizationType = [
      "w", // Warm Up
      "bs", // Bar plot/Slide Bar
      "bsm", // Bar plot/Small Multiple
      "ss", // Scatter plot/Slide Bar
      "ssm" // Scatter plot/Slide Bar
    ]

    if (question_param > 1) {
      var lastQuestion = users[0].questionOrder[question - 1];
      var lastViz = visualizationType[parseInt(lastQuestion/5)];
      updatePaper(req.body, lastQuestion, lastViz);
    }
    if (question_param > 10) return res.render("finish");
    var randomInt = getRandomInt(1,8);
    var data = dataGenerator(randomInt);
    var options = getOptions(randomInt, data, users[0].questionOrder[question_param]);

    res.render("question", {
      participantId: req.body.participantId,
      question: question_description[1 - (question % 2)],
      visualization: visualizationType[parseInt((question-1)/2, 10)],
      options: options["options"],
      correctAnswer: options["correctAnswer"],
      question_shown: question_param,
      data: data
    })
  }).limit(1)
}

exports.getFinish = (req, res) => {
  res.render("finish");
}

exports.getViz = (req, res) => {
  res.render("visualizations/warmup-bar");
}
