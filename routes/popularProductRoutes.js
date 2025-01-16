const express = require("express");
const {
  getPopularProducts,
} = require("../controllers/popularProductController");

const router = express.Router();

// Route to fetch popular products
router.get("/popular-products", getPopularProducts);

module.exports = router;
