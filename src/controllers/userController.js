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

const get_user = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  get_users,
  get_user,
};
