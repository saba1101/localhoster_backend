const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/authRouter");

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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied.");

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid token format");
    }
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Invalid token.");
  }
};

app.get("/", (req, res) => {
  res.send("Root Connection");
});

app.use("/user", verifyToken, userRouter);
app.use("/auth", authRouter);

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
