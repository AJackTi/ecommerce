"use strict";

var mongoose = require("mongoose");

var connectionString = "mongodb://localhost:27017/shopDEV";
mongoose
  .connect(connectionString)
  .then(function (_) {
    return console.log("Connected Mongodb Success");
  })
  ["catch"](function (err) {
    return console.log("Error Connect!");
  }); // dev

if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", {
    color: true,
  });
}

module.exports = mongoose;
