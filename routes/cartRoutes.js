const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCartItems);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);
router.delete("/clear/:userId", clearCart);

module.exports = router;
