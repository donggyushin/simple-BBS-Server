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

router.get("/:id", function (req, res) {
  if (!req.session.token) {
    return res.json({
      ok: false,
      status: 404,
      error: "unauthorized"
    });
  }
  var bbsId = req.params.id;
  var sql = "SELECT b.id, b.title, b.content, u.username, u.profile_image FROM board b INNER JOIN user u ON b.writer = u.id WHERE b.id = ?";
  var post = [bbsId];
  _mysql2.default.query(sql, post, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res.json({
        ok: false,
        status: 400,
        error: "db error"
      });
    }
    var board = results[0];
    var sql = "SELECT c.id, c.message, u.username FROM comment c INNER JOIN user u ON c.writer = u.id INNER JOIN board b ON c.board = b.id WHERE b.id = ?";
    var post = [bbsId];
    _mysql2.default.query(sql, post, function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.json({
          ok: false,
          status: 400,
          error: "db error2"
        });
      }

      var comments = results;
      return res.json({
        boardDetails: {
          board: board,
          comments: comments
        }
      });
    });
  });
});

router.post("/", async function (req, res) {
  var userId = req.session.token;
  var title = req.body.title;
  var content = req.body.content;

  var sql = "INSERT INTO board(title, content, writer) VALUES(?,?,?)";
  var post = [title, content, userId];

  _mysql2.default.query(sql, post, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res.json({
        ok: false,
        status: 400,
        error: "db error"
      });
    } else {
      return res.json({
        ok: true,
        status: 200,
        error: null
      });
    }
  });
  // const username = req.session.token;
  // const title = req.body.title;
  // const content = req.body.content;
  // let sql = "SELECT id FROM user WHERE username = ?";
  // const post = [username];
  // await mysql.query(sql, post, (err, results, fields) => {
  //   if (err) {
  //     console.log(err);
  //     return res.json({
  //       ok: false,
  //       status: 400,
  //       error: "db error"
  //     });
  //   } else {
  //     const user_id = results[0].id;
  //     let sql = "INSERT INTO board(title, content, writer) VALUES (?,?,?)";
  //     const post = [title, content, user_id];
  //     mysql.query(sql, post, (err, results, fields) => {
  //       if (err) {
  //         console.log(err);
  //         return res.json({
  //           ok: false,
  //           status: 400,
  //           error: "fail to write"
  //         });
  //       } else {
  //         return res.json({
  //           ok: false,
  //           status: 200,
  //           error: null
  //         });
  //       }
  //     });
  //   }
  // });
});

exports.default = router;