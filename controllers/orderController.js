const { orderService } = require("../services/orderService");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order.length)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order[0]);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: err.message,
    });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res
      .status(201)
      .json({ success: true, order: { id: result.insertId, ...req.body } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: err.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const result = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (!result.affectedRows)
      return res.status(404).json({ message: "Order not found" });

    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: err.message,
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Order not found" });

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: err.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
