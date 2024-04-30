const categoryController = require("../controllers/product/categoryController");
const express = require("express");
const router = express.Router();

router.get("/getCategories", categoryController.get_categories);
router.post("/createCategory", categoryController.create_category);
router.post("/deleteCategory", categoryController.delete_category);
router.put("/updateCategory/:id", categoryController.update_category);

module.exports = router;
