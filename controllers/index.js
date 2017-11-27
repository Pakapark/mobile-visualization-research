var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');

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

exports.getInfo = (req, res) => {
  res.redirect("/");
}

exports.postInfo = (req, res) => {
  if (!req.body.hasOwnProperty('participantId')) return res.redirect("/");
  var newUser = new User({ participantId: req.body.participantId });
  newUser.save();
  res.render('info', { participantId: req.body.participantId });
}

exports.getExperiment = (req, res) => {
  res.render('experiment')
}

exports.postExperiment = (req, res) => {
  User.find({participantId: req.body.participantId}, (err, users) => {
    if (users.length == 0) res.redirect("/");
    users[0].firstName = req.body.firstname;
    users[0].lastName = req.body.lastname;
    users[0].gender = req.body.gender;
    users[0].examType = "B"//randomTest();
    users[0].save();
  }).limit(1)

  res.render('experiment', { participantId: req.body.participantId })
}

exports.postExperimentQuestion = (req, res) => {
  User.find({participantId: req.body.participantId}, (err, users) => {
    if (users.length == 0) return res.redirect("/");

    var question = req.params.question;
    Question.find({question: parseInt(question)}, (err, questions) => {
      if (questions.length == 0) return // Last question

      var parameter = {
        participantId: req.body.participantId,
        question: questions[0],
        nextQuestion: (parseInt(question, 10) + 1).toString(),
        examType: users[0].examType
      }

      res.render('question', parameter);
    }).limit(1);
  }).limit(1)
}
