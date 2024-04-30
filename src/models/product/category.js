const mongoose = require("mongoose");

const categoryScheme = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model("Category", categoryScheme);

module.exports = Category;
