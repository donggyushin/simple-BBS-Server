import express from "express";
import post from "./post";
import auth from "./auth";
import board from "./board";
import boardlist from "./boradlist";
import comment from "./comment";

const router = express.Router();

router.use("/post", post);
router.use("/auth", auth);
router.use("/board", board);
router.use("/boardlist", boardlist);
router.use("/comment", comment);

export default router;
