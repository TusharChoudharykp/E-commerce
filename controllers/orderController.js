const {
  placeOrderService,
  getUserOrdersService,
} = require("../services/orderService");

// Place an order
const placeOrder = async (req, res) => {
  try {
    const { user_id, cart_id } = req.body;
    if (!user_id || !cart_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const order = await placeOrderService(user_id, cart_id);
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await getUserOrdersService(user_id);
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};
