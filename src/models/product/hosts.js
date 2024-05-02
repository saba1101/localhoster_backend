const mongoose = require("mongoose");

const hostScheme = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  Article: {
    type: String,
    require: true,
  },
  Amenities: {
    type: Array,
    require: true,
  },
  Images: {
    type: Array,
    require: true,
  },
  Author: {
    type: String,
  },
});

const Hosts = mongoose.model("Hosts", hostScheme);

module.exports = Hosts;
