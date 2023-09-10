"use strict";

var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var compression = require("compression");
var app = express(); // init middlewares
// app.use(morgan("combined"));
// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("common"));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); // init db
// require('./dbs/init.mongodb.lv0')

require("./dbs/init.mongodb"); // init routes

app.get("", function (req, res, next) {
  return res.status(200).json({
    message: "Welcome to course!",
  });
}); // handling error

module.exports = app;
