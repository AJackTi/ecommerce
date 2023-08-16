require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { checkOverLoad } = require("./helpers/check.connect");

const app = express();

// init middlewares
// app.use(morgan("combined"));
// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("common"));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
// require('./dbs/init.mongodb.lv0')
require("./dbs/init.mongodb");
checkOverLoad();

// init routes
app.use("/", require("./routes"));

// handling error

module.exports = app;
