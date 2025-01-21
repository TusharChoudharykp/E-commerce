const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/search", searchProducts); ///api/products/search?searchTerm=Apple product
router.get("/:id", getProductById);

// Admin Routes (Require JWT)
router.post("/", authenticateJWT, createProduct);
router.put("/:id", authenticateJWT, updateProduct);
router.delete("/:id", authenticateJWT, deleteProduct);

module.exports = router;

// const express = require("express");
// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   searchProducts,
// } = require("../controllers/productController");

// const router = express.Router();

// // User routes
// router.get("/", getAllProducts);
// router.get("/search", searchProducts);
// router.get("/:id", getProductById);

// // Admin routes
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// module.exports = router;
