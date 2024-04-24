const AuthSessions = require("../../models/authentication/authSessions");

const start_session = async (req, res) => {
  try {
    await AuthSessions.create(req);
    // res.status(200).json({ session });
  } catch (error) {
    console.log(error);

    // res.status(500).json({ message: error.message });
  }
};

const get_sessions = async (req, res) => {
  try {
    const sessions = AuthSessions.find({});
    return sessions;
    // res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    return error;
    // res.status(500).json({ message: error.message });
  }
};

const remove_expired_sessions = async () => {
  try {
    const currentDate = new Date();
    const expiredSessions = await AuthSessions.deleteMany({
      Expire: { $lt: currentDate },
    });
    console.log(`${expiredSessions.deletedCount} expired sessions removed`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  start_session,
  get_sessions,
  remove_expired_sessions,
};
