const User = require("../models/userModel");

const create_user = async (req, res) => {
  try {
    const { Password, UserName } = req.body;
    if (await User.findOne({ UserName: UserName })) {
      return res.status(500).json({ message: `UserName already exists` });
    } else if (await User.findOne({ Password: Password })) {
      return res.status(500).json({ message: `Try another password` });
    } else if (await User.findOne({ Password: Password, UserName: UserName })) {
      return res.status(500).json({ message: `User already exists` });
    } else {
      const user = await User.create(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  create_user,
};
