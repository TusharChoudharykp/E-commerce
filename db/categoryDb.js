const executeQuery = require("../models/executeQuery");

const getAllCategoriesFromDb = async () => {
  return await executeQuery("SELECT * FROM categories");
};

const getCategoryByIdFromDb = async (id) => {
  return await executeQuery("SELECT * FROM categories WHERE id = ?", [id]);
};

const insertCategoryToDb = async (name, icon, color) => {
  return await executeQuery(
    "INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)",
    [name, icon, color]
  );
};

const updateCategoryInDb = async (id, name, icon, color) => {
  return await executeQuery(
    "UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?",
    [name, icon, color, id]
  );
};

const deleteCategoryFromDb = async (id) => {
  return await executeQuery("DELETE FROM categories WHERE id = ?", [id]);
};

module.exports = {
  getAllCategoriesFromDb,
  getCategoryByIdFromDb,
  insertCategoryToDb,
  updateCategoryInDb,
  deleteCategoryFromDb,
};
