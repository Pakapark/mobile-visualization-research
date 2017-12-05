var mongoose = require("mongoose");
var User = require("./models/user");
var Paper = require("./models/paper");
var _ = require("lodash");
var fs = require("fs")

User.find({"device": "phone"}, (err, users) => {
  if (err) return console.log(err);
  var userJson = JSON.stringify(users);
  var userId = _.map(users, (user) => {
    return user.participantId
  });

  Paper.find({"userId": {"$in": userId}}, (err, papers) => {
    if (err) return console.log(err);
    var jsonPaper = JSON.stringify(papers);
    fs.writeFile("paper.json", jsonPaper, (err) => {
      if (err) return console.log(err);
      console.log("done");
    })
  })


  fs.writeFile("user.json", userJson, (err) =>{
    if (err) return console.log(err);
    console.log("done");
  })


  // _.forEach(users, (user) => {
  //   Paper.find({"userId": user.participantId}, (err, papers) =>{
  //     if (err) return console.log(err);
  //     if (papers.length == 0) return
  //     if (papers[0].eval.length >= 10) {
  //
  //     }
  //   }).limit(1);
  // })
})
