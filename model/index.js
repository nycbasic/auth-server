const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(
  "mongodb://localhost:27017/auth2",
  {
    useNewUrlParser: true,
    keepAlive: true
  }
);

module.exports.User = require("./user");
