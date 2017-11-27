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

    var question = parseInt(req.params.question, 10);
    if (question > 1) {
      Paper.find({userId: req.body.participantId}, (err, papers) => {
        if (papers.length == 0) {
          var newPaper = new Paper({
            userId: req.body.participantId,
            examType: users[0].examType,
            question: [{
              question: question - 1,
              answer: req.body.answer,
              firstTime: req.body.firstTime,
              lastTime: req.body.lastTime,
              createdAt: Date.now()
            }]
          })

          newPaper.save();
        } else {
          papers[0].question.push({
            question: question - 1,
            answer: req.body.answer,
            firstTime: req.body.firstTime,
            lastTime: req.body.lastTime,
            createdAt: Date.now()
          })

          papers[0].save();
        }
      }).limit(1)

      users[0]["question" + (question - 1).toString()] = req.body.answer;
      users[0].save();
    }
    Question.find({question: question}, (err, questions) => {
      if (questions.length == 0) return res.send("You have reach the end!!!");

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
