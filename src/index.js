import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api";
import session from "express-session";
var MySQLStore = require("express-mysql-session")(session);
import session_store_opts from "./session/storeOptions";

const app = express();
const sessionStore = new MySQLStore(session_store_opts);

let port = 8080;
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "sadkljsdaklj!",
    secret: "askldjaslkdj@",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use("/api", api);
//SERVE STATIC FILES = REACT PROJECT
app.use("/", express.static(__dirname + "/../../client/build"));
app.use("/media", express.static(__dirname + "/media"));

app.get("/test", (req, res) => {
  const session = req.session.test;
  return res.json({
    session: session
  });
});

app.listen(port, () => {
  console.log("Express is listening on port", port);
});
