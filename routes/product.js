const connection = require("../connect");
const express = require("express");
const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET product by ID
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length)
        return res.status(404).json({ message: "Product not found" });
      res.json(results[0]);
    }
  );
});

// POST create product
router.post("/", (req, res) => {
  const { name, description, category_id, countInStock, ...rest } = req.body;
  if (!name || !description || !category_id || countInStock === undefined)
    return res.status(400).json({ error: "Missing required fields" });

  connection.query(
    "SELECT id FROM categories WHERE id = ?",
    [category_id],
    (err, category) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!category.length)
        return res.status(400).json({ error: "Invalid category_id" });

      const query = "INSERT INTO products SET ?";
      const product = { name, description, category_id, countInStock, ...rest };
      connection.query(query, product, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({ message: "Product created successfully", product });
      });
    }
  );
});

// PUT update product
router.put("/:id", (req, res) => {
  const { name, description, category_id, countInStock, ...rest } = req.body;
  if (!name || !description || !category_id || countInStock === undefined)
    return res.status(400).json({ error: "Missing required fields" });

  connection.query(
    "SELECT id FROM categories WHERE id = ?",
    [category_id],
    (err, category) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!category.length)
        return res.status(400).json({ error: "Invalid category_id" });

      const query = "UPDATE products SET ? WHERE id = ?";
      const product = { name, description, category_id, countInStock, ...rest };
      connection.query(query, [product, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results.affectedRows)
          return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated successfully" });
      });
    }
  );
});

// DELETE product
router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.affectedRows)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    }
  );
});

// GET featured products
router.get("/get/featured/:count", (req, res) => {
  const count = parseInt(req.params.count) || 0;
  connection.query(
    "SELECT * FROM products WHERE isFeatured = true LIMIT ?",
    [count],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length)
        return res.status(404).json({ message: "No featured products found" });
      res.json(results);
    }
  );
});

module.exports = router;
