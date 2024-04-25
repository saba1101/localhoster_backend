const User = require("../models/userModel");

const get_users = async (req, res) => {
  try {
    const users = await User.find({});
    const modifiedUsers = users.map((user) => {
      const { __v, ...userWithoutV } = user.toObject();
      return { ...userWithoutV };
    });
    res.status(200).json(modifiedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  get_users,
};
