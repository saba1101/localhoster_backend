const AuthSessions = require("../../models/authentication/authSessions");

const start_session = async (req, res) => {
  try {
    await AuthSessions.create(req);
  } catch (error) {
    console.log(error);
  }
};

const get_sessions = async (req, res) => {
  try {
    const sessions = AuthSessions.find({});
    return sessions;
  } catch (error) {
    console.log(error);
    return error;
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

const destroy_session = async (token) => {
  try {
    await AuthSessions.deleteOne({ Token: token });
    return;
  } catch (error) {
    return error;
  }
};

module.exports = {
  start_session,
  get_sessions,
  remove_expired_sessions,
  destroy_session,
};
