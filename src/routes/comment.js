import express from "express";
import mysql from "../db/mysql";
const router = express.Router();

router.post("/:id", (req, res) => {
  if (!req.session.token) {
    return res.json({
      ok: false,
      status: 404,
      error: "unauthorized"
    });
  }
  const userId = req.session.token;
  const bbsId = req.params.id;
  const message = req.body.message;

  const sql = "INSERT INTO comment(writer, board, message) VALUES (?,?,?)";
  const post = [userId, bbsId, message];
  mysql.query(sql, post, (err, results, fields) => {
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

export default router;
