const executeQuery = require("../models/executeQuery");

// Get all orders
const getAllOrders = async () => {
  return await executeQuery("SELECT * FROM `order`");
};

// Get order by ID
const getOrderById = async (id) => {
  return await executeQuery("SELECT * FROM `order` WHERE id = ?", [id]);
};

// Create new order
const createOrder = async (orderData) => {
  const {
    user_id,
    cart_id,
    quantity,
    price,
    total_amount,
    user_address_id,
    status,
  } = orderData;

  return await executeQuery(
    `INSERT INTO \`order\` (user_id, cart_id, quantity, price, total_amount, user_address_id, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, cart_id, quantity, price, total_amount, user_address_id, status]
  );
};

// Update order status
const updateOrderStatus = async (id, status) => {
  return await executeQuery("UPDATE `order` SET status = ? WHERE id = ?", [
    status,
    id,
  ]);
};

// Delete order
const deleteOrder = async (id) => {
  return await executeQuery("DELETE FROM `order` WHERE id = ?", [id]);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
