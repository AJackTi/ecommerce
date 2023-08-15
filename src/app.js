const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
// app.use(morgan("combined"));
// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("common"));

// init middlewares

// init db

// init routes
app.get("", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to course!",
  });
});

// handling error

module.exports = app;
