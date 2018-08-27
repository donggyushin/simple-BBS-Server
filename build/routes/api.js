"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _post = require("./post");

var _post2 = _interopRequireDefault(_post);

var _auth = require("./auth");

var _auth2 = _interopRequireDefault(_auth);

var _board = require("./board");

var _board2 = _interopRequireDefault(_board);

var _boradlist = require("./boradlist");

var _boradlist2 = _interopRequireDefault(_boradlist);

var _comment = require("./comment");

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use("/post", _post2.default);
router.use("/auth", _auth2.default);
router.use("/board", _board2.default);
router.use("/boardlist", _boradlist2.default);
router.use("/comment", _comment2.default);

exports.default = router;