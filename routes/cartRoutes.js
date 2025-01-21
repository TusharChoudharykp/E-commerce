const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCartItems);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);

module.exports = router;

// const express = require("express");
// const {
//   getCartItems,
//   addToCart,
//   updateCartItem,
//   removeCartItem,
// } = require("../controllers/cartController");

// const {
//   validateRequest,
//   addToCartSchema,
//   updateCartItemSchema,
// } = require("../middlewares/validationMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");

// const router = express.Router();

// router.get("/:userId", authMiddleware, getCartItems);
// router.post("/", authMiddleware, validateRequest(addToCartSchema), addToCart);
// router.put(
//   "/:id",
//   authMiddleware,
//   validateRequest(updateCartItemSchema),
//   updateCartItem
// );
// router.delete("/:id", authMiddleware, removeCartItem);

// module.exports = router;
