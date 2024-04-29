const Category = require("../../models/product/category");

const create_category = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const get_categories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const delete_category = async (req, res) => {
  try {
    const { id } = req.body;
    const categories = await Category.findByIdAndDelete(id);
    res.status(200).send("Delete Successfully");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  create_category,
  get_categories,
  delete_category,
};
