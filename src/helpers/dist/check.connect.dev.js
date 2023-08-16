'use strict';

var mongoose = require('mongoose');

var os = require('os');

var process = require('process');

var _SECONDS = 5000; // count connect

var countConnect = function countConnect() {
  var numConnection = mongoose.connections.length;
  console.log("Number of connection: ".concat(numConnection));
}; // check over load


var checkOverLoad = function checkOverLoad() {
  // Monitor every 5 seconds
  setInterval(function () {
    var numConnection = mongoose.connections.length;
    var numCores = os.cpus().length;
    var memoryUsage = process.memoryUsage().rss; // Example maximum number of connections based on number of cores

    var maxConnection = numCores * 5;
    console.log("Active connections: ".concat(numConnection));
    console.log("Memory usage: ".concat(memoryUsage / 1024 / 1024, " MB"));

    if (numConnection > maxConnection) {
      console.log("Connection overload detected"); // notify.send(...)
    }
  }, _SECONDS);
};

module.exports = {
  countConnect: countConnect,
  checkOverLoad: checkOverLoad
};