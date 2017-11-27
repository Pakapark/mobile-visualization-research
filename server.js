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

// ===============
// ===== SEED ====
// ===============
// require("./seed");

// =======================
// ===== CONTROLLERS =====
// =======================
var indexController = require("./controllers/index");

router.route('/')
  .get(indexController.getIndex);

router.route('/consent')
  .get(indexController.getConsent);

router.route('/info')
  .post(indexController.postInfo);

router.route('/experiment')
  .post(indexController.postExperiment);

router.route('/experiment/:question')
  .post(indexController.postExperimentQuestion);

router.route('*')
  .get(indexController.getIndexRedirect);

app.listen(port);
console.log("Connect Server at port: " + port);
