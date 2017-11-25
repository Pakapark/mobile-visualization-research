var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    database    = require("./configs/database"),
    passport    = require("passport");

// ====================
// ===== DATABASE =====
// ====================
mongoose.Promise = require('bluebird');
mongoose.connect(database.url, {useMongoClient: true});

// ================
// ===== PORT =====
// ================
const port = process.env.PORT || 8080;

// ===================
// ===== CONFIGS =====
// ===================
var router = express.Router();
require("./configs/appConfig")(app, express, router, passport);
// require("./configs/passport")(passport);

// =======================
// ===== CONTROLLERS =====
// =======================
var indexController = require("./controllers/index");

router.route('/')
  .get(indexController.getIndex);

router.route('/consent')
  .get(indexController.getConsent);

router.route('/info')
  .get(indexController.getInfo)
  .post(indexController.postInfo);

router.route('/experiment')
  .get(indexController.getExperiment) // testing
  .post(indexController.postExperiment);



app.listen(port);
console.log("Connect Server at port: " + port);
