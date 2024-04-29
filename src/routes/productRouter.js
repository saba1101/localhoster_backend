const categoryController = require("../controllers/product/categoryController");
const express = require("express");
const router = express.Router();

router.get("/getCategories", categoryController.get_categories);
router.post("/createCategory", categoryController.create_category);
router.delete("/deletecategory/:id", categoryController.create_category);

module.exports = router;
