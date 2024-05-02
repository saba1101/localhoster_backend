const categoryController = require("../controllers/product/categoryController");
const hostsController = require("../controllers/product/hostsController");
const express = require("express");
const router = express.Router();

router.get("/getCategories", categoryController.get_categories);
router.post("/createCategory", categoryController.create_category);
router.post("/deleteCategory", categoryController.delete_category);
router.put("/updateCategory/:id", categoryController.update_category);

router.post("/createHost", hostsController.create_host);
router.get("/getAll", hostsController.get_hosts);
router.put("/updateHost/:id", hostsController.update_host);
router.post("/deleteHost", hostsController.delete_host);

module.exports = router;
