const connection = require("../connect");
const express = require("express");
const router = express.Router();
const { insertCategory, getCategories } = require("../models/category");

// GET all categories
router.get("/", (req, res) => {
  const query = "SELECT * FROM categories";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(200).json(results); // Send categories as response
  });
});

// GET category by ID
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM categories WHERE id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error fetching category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json(results[0]);
  });
});

// POST new category
router.post("/", (req, res) => {
  const { name, icon, color } = req.body;
  const query = "INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)";

  connection.query(query, [name, icon, color], (err, results) => {
    if (err) {
      console.error("Error inserting category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(201).json({
      success: true,
      category: { id: results.insertId, name, icon, color },
    });
  });
});

// PUT (Update) category by ID
router.put("/:id", (req, res) => {
  const { name, icon, color } = req.body;
  const query =
    "UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?";

  connection.query(
    query,
    [name, icon, color, req.params.id],
    (err, results) => {
      if (err) {
        console.error("Error updating category:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Category updated successfully" });
    }
  );
});

// DELETE category by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM categories WHERE id = ?";

  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  });
});

module.exports = router;
