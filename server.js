var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    database    = require("./configs/database"),
    passport    = require("passport");

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

app.listen(port);
console.log("Connect Server at port: " + port);
