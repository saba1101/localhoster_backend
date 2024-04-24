const mongoose = require("mongoose");

const authSessions = mongoose.Schema({
  Token: {
    type: String,
  },
  UserId: {
    type: String,
  },
  Expire: {
    type: String,
  },
});

const AuthSessions = mongoose.model("AuthSessions", authSessions);

module.exports = AuthSessions;
