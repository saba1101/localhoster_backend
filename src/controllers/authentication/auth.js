const User = require("../../models/userModel");
const AuthSessionController = require("../../controllers/authentication/authSessionsController");
const jwt = require("jsonwebtoken");
const formatTimestamp = require("../../utils/formatTimeStamp");

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
        Expire: formatTimestamp(jwt.decode(token).exp),
      });

      res.status(200).json({ message: `${UserName} Authorized`, token });
    } else {
      res.status(401).json({ message: "Wrong UserName or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login_user,
};
