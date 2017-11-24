var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var device = require("express-device");
var compression = require("compression");
var favicon = require('serve-favicon');
var methodOverride = require('method-override');

module.exports = function(app, express, router, passport){
  app.set("view engine", "ejs");
  app.use(methodOverride('_method'));
  app.use(cookieParser("Visualization Research"));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compression());
  app.use(express.static('public'))
  app.use(require("express-session")({
      secret: "Visualization Research",
      resave: false,
      saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(device.capture());
  app.use("/", router);
}
