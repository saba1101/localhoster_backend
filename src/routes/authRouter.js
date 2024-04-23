const express = require("express");
const authController = require("../controllers/authentication/auth");
const router = express.Router();

router.post("/login", authController.login_user);

module.exports = router;
