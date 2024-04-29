const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/authRouter");
const verifyToken = require("./src/middleware/verifyToken");
const authSessionsController = require("./src/controllers/authentication/authSessionsController");
const productRouter = require("./src/routes/productRouter");
const sessionExpireInterval = 300000; //60 * 60 * 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const config = {
  port: process.env.PORT,
  uri: process.env.MONGO_URI,
};

app.get("/", (req, res) => {
  res.send("Root Connection");
});

app.use("/user", verifyToken, userRouter);
app.use("/product", verifyToken, productRouter);
app.use("/auth", authRouter);

function removeExpiredSessionsInterval() {
  authSessionsController
    .remove_expired_sessions()
    .then(() => {
      console.log("Expired sessions removed successfully");
    })
    .catch((error) => {
      console.error("Error removing expired sessions:", error);
    });
}

removeExpiredSessionsInterval();
setInterval(removeExpiredSessionsInterval, sessionExpireInterval);

mongoose.set("strictQuery", false);
mongoose
  .connect(config.uri)
  .then((response) => {
    console.log("Connected to mongoDB");
    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
