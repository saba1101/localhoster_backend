const express = require("express");
const authController = require("../controllers/authentication/auth");
const router = express.Router();

router.post("/login", authController.login_user);
router.post("/logout", authController.log_out_user);
router.post("/create", authController.create_user);

module.exports = router;
