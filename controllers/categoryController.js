const executeQuery = require("../models/executeQuery");

//get all category
const getAllCategories = async (req, res) => {
  try {
    const categories = await executeQuery("SELECT * FROM categories");
    console.log("GET /api/categories - Success");
    res.status(200).json(categories);
  } catch (err) {
    console.log("GET /api/categories - Failed", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

//get category by id
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await executeQuery(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    if (category.length === 0) {
      console.log(`GET /api/categories/${id} - Failed: Category not found`);
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    console.log(`GET /api/categories/${id} - Success`);
    res.status(200).json(category[0]);
  } catch (err) {
    console.log(`GET /api/categories/${id} - Failed`, err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch category" });
  }
};

//create category
const createCategory = async (req, res) => {
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    console.log("POST /api/categories - Failed: All fields are required");
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await executeQuery(
      "INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)",
      [name, icon, color]
    );
    console.log("POST /api/categories - Success");
    res.status(201).json({
      success: true,
      category: { id: result.insertId, name, icon, color },
    });
  } catch (err) {
    console.log("POST /api/categories - Failed", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to create category" });
  }
};

//update category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    console.log(`PUT /api/categories/${id} - Failed: All fields are required`);
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await executeQuery(
      "UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?",
      [name, icon, color, id]
    );
    if (result.affectedRows === 0) {
      console.log(`PUT /api/categories/${id} - Failed: Category not found`);
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    console.log(`PUT /api/categories/${id} - Success`);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (err) {
    console.log(`PUT /api/categories/${id} - Failed`, err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update category" });
  }
};

//delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeQuery("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      console.log(`DELETE /api/categories/${id} - Failed: Category not found`);
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    console.log(`DELETE /api/categories/${id} - Success`);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.log(`DELETE /api/categories/${id} - Failed`, err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
