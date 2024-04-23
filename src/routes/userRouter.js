const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/create", userController.create_user);
router.get("/getAll", userController.get_users);

module.exports = router;
