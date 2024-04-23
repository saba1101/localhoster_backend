const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
