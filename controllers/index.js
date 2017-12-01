var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');
var Paper = require('../models/paper');

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
  var newUser = new User({ participantId: req.body.participantId, createdAt: Date.now()});
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

function updatePaper(body, questionOrder, question_param){
  Paper.find({userId: body.participantId}, (err, papers) => {
    var answer = {
      question: questionOrder[question_param - 1],
      answer: body.answer,
      firstTime: body.firstTime,
      lastTime: body.lastTime,
      createdAt: Date.now()
    }

    if (papers.length == 0) {
      var newPaper = new Paper({
        userId: body.participantId,
        answers: [answer]
      });
      newPaper.save();
    } else {
      papers[0].answers.push(answer);
      papers[0].save();
    }
  }).limit(1)
}

exports.postExperimentQuestion = (req, res) => {
  User.find({participantId: req.body.participantId}, (err, users) => {
    if (users.length == 0) return res.redirect("/");
    var question_param = parseInt(req.params.question);
    if (question_param > 1) updatePaper(req.body, users[0].questionOrder, question_param);

    Question.find({question: users[0].questionOrder[req.params.question]}, (err, questions) => {
      if (questions.length == 0) return res.send("Question is not created yet.");
      res.render("question", {
        participantId: req.body.participantId,
        question: questions[0],
        question_shown: parseInt(req.params.question)
      })
    }).limit(1)
  }).limit(1)
}

exports.getViz = (req, res) => {
  res.render("visualizations/warmup-bar");
}
