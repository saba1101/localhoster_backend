const User = require("../../models/userModel");
const AuthSessionController = require("../../controllers/authentication/authSessionsController");
const jwt = require("jsonwebtoken");

const login_user = async (req, res) => {
  try {
    const { Password, UserName } = req.body;
    const user = await User.findOne({ Password, UserName });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      await AuthSessionController.start_session({
        Token: token,
        UserId: user._id,
        Expire: new Date(jwt.decode(token).exp * 1000), //formatTimestamp(jwt.decode(token).exp),
      });

      res.status(200).json({ message: `${UserName} Authorized`, token, user });
    } else {
      res.status(401).json({ message: "Wrong UserName or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const log_out_user = async (req, res) => {
  try {
    const token = req.body.token;
    AuthSessionController.destroy_session(token);
    res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    res.status(500);
  }
};

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

module.exports = {
  login_user,
  create_user,
  log_out_user,
};
