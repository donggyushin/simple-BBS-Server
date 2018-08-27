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

router.post("/:id", function (req, res) {
  if (!req.session.token) {
    return res.json({
      ok: false,
      status: 404,
      error: "unauthorized"
    });
  }
  var userId = req.session.token;
  var bbsId = req.params.id;
  var message = req.body.message;

  var sql = "INSERT INTO comment(writer, board, message) VALUES (?,?,?)";
  var post = [userId, bbsId, message];
  _mysql2.default.query(sql, post, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res.json({
        ok: false,
        status: 400,
        error: "db error"
      });
    }
    return res.json({
      ok: true,
      status: 200,
      error: null
    });
  });
});

exports.default = router;