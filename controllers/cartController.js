const {
  getCartItemsService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
} = require("../services/cartService");

// Get all cart items for a user
const getCartItems = async (req, res) => {
  try {
    const cartItems = await getCartItemsService(req.params.userId);
    res.status(200).json({ success: true, cartItems });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart items" });
  }
};

// Add a product to cart
const addToCart = async (req, res) => {
  try {
    const result = await addToCartService(req.body);
    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cartItem: { id: result.insertId, ...req.body },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const result = await updateCartItemService(
      req.params.id,
      req.body.quantity
    );
    if (!result.affectedRows)
      return res.status(404).json({ message: "Cart item not found" });
    res
      .status(200)
      .json({ success: true, message: "Cart item updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update cart item" });
  }
};

// Remove a product from cart
const removeCartItem = async (req, res) => {
  try {
    const result = await removeCartItemService(req.params.id);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Cart item not found" });
    res
      .status(200)
      .json({ success: true, message: "Cart item removed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove cart item" });
  }
};

// Clear entire cart for a user
const clearCart = async (req, res) => {
  try {
    const result = await clearCartService(req.params.userId);
    if (!result.affectedRows)
      return res.status(404).json({ message: "No items found in cart" });
    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
