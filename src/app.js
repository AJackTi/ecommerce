const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

// app.use(morgan("combined"));
// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("common"));
app.use(morgan("dev"));
app.use(helmet());

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
