require("dotenv").config();
require("./models/connection");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articlesRouter = require("./routes/articles");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

module.exports = app;
