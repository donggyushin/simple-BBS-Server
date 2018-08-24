"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require("./routes/api");

var _api2 = _interopRequireDefault(_api);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _storeOptions = require("./session/storeOptions");

var _storeOptions2 = _interopRequireDefault(_storeOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MySQLStore = require("express-mysql-session")(_expressSession2.default);


var app = (0, _express2.default)();
var sessionStore = new MySQLStore(_storeOptions2.default);

var port = 8080;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({ type: "application/*+json" }));
app.use((0, _expressSession2.default)({
  key: "sadkljsdaklj!",
  secret: "askldjaslkdj@",
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use("/api", _api2.default);

app.get("/test", function (req, res) {
  var session = req.session.test;
  return res.json({
    session: session
  });
});

app.listen(port, function () {
  console.log("Express is listening on port", port);
});