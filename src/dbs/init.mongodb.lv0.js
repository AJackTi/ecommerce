"use strict";

const mongoose = require("mongoose");

const connectionString = `mongodb://localhost:27017/shopDEV`;
mongoose
  .connect(connectionString)
  .then((_) => console.log(`Connected Mongodb Success`))
  .catch((err) => console.log(`Error Connect!`));

// dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
