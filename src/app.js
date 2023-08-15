const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middlewares
// app.use(morgan("combined"));
// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("common"));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get("", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to course!",
  });
});

// handling error

module.exports = app;
