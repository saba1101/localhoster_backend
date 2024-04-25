const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/getAll", userController.get_users);

module.exports = router;
