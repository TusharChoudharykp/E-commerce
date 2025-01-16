const executeQuery = require("../models/executeQuery");

// Get all categories
const getAllCategoriesService = async () => {
  return await executeQuery("SELECT * FROM categories");
};

// Get category by ID
const getCategoryByIdService = async (id) => {
  return await executeQuery("SELECT * FROM categories WHERE id = ?", [id]);
};

// Create category
const createCategoryService = async (name, icon, color) => {
  return await executeQuery(
    "INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)",
    [name, icon, color]
  );
};

// Update category
const updateCategoryService = async (id, name, icon, color) => {
  return await executeQuery(
    "UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?",
    [name, icon, color, id]
  );
};

// Delete category
const deleteCategoryService = async (id) => {
  return await executeQuery("DELETE FROM categories WHERE id = ?", [id]);
};

module.exports = {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
