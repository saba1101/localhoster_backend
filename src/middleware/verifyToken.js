const express = require("express");
const jwt = require("jsonwebtoken");
const AuthSessionController = require("../controllers/authentication/authSessionsController");
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied.");

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid token format");
    }
    const currentUserAuthToken = await AuthSessionController.get_sessions();
    const currentSession = currentUserAuthToken.find(
      (obj) => obj.Token === tokenParts[1]
    );
    if (tokenParts[1] === currentSession.Token) next();
    // const decoded = jwt.verify(tokenParts[1], currentSession.Token);
    // req.userId = decoded.userId;
  } catch (error) {
    res.status(400).send({ message: "Session Expired" });
  }
};

module.exports = verifyToken;
