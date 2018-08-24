"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mysql = require("../db/mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/logout", function (req, res) {
  delete req.session.token;
  return res.json({
    ok: true,
    error: null,
    status: 200
  });
});

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var sql = "SELECT password FROM user WHERE username = ?";
  var post = [username];
  _mysql2.default.query(sql, post, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res.json({
        ok: false,
        error: "db error",
        status: 400
      });
    } else {
      var user_password = results[0].password;
      if (password === user_password) {
        req.session.token = username;
        return res.json({
          ok: true,
          error: null,
          status: 200
        });
      } else {
        return res.json({
          ok: false,
          error: "check again username and password",
          status: 400
        });
      }
    }
  });
});

router.post("/new", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var sql = "SELECT * FROM user WHERE username=?";
  var post = [username];
  _mysql2.default.query(sql, post, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res.json({
        ok: false,
        error: "db error",
        status: 400
      });
    } else {
      if (results.length === 0) {
        var _sql = "INSERT INTO user (username, password) VALUES(?,?)";
        var _post = [username, password];
        _mysql2.default.query(_sql, _post, function (err, results, fields) {
          if (err) {
            console.log(err);
            return res.json({
              ok: false,
              error: "2 db error",
              status: 400
            });
          } else {
            return res.json({
              ok: true,
              error: null,
              status: 200
            });
          }
        });
      } else {
        return res.json({
          ok: false,
          error: "existing username",
          status: 400
        });
      }
    }
  });
});

exports.default = router;