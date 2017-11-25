var mongoose = require('mongoose');
var User = require('../models/user');

function makeid() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
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
  var newUser = new User({ participantId: req.body.participantId });
  newUser.save();
  res.render('info', { participantId: req.body.participantId });
}
