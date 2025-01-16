const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductCount,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

// User routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/featured/:count", getFeaturedProducts);
router.get("/get/count", getProductCount);

module.exports = router;
