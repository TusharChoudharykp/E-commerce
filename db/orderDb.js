const executeQuery = require("../models/executeQuery");

const getCartItemsFromDb = async (user_id, cart_id) => {
  const query = `
    SELECT c.product_id, c.quantity, p.price 
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ? AND c.id = ?;
  `;
  return await executeQuery(query, [user_id, cart_id]);
};

const insertOrderInDb = async (user_id, cart_id, total_amount) => {
  const query = `INSERT INTO orders (user_id, cart_id, total_amount, status) VALUES (?, ?, ?, 'Pending')`;
  return await executeQuery(query, [user_id, cart_id, total_amount]);
};

const insertOrderItemsInDb = async (order_id, cartItems) => {
  const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
  const values = cartItems.map((item) => [
    order_id,
    item.product_id,
    item.quantity,
    item.price,
  ]);
  return await executeQuery(query, [values]);
};

const clearCartInDb = async (user_id, cart_id) => {
  const query = `DELETE FROM cart WHERE user_id = ? AND id = ?`;
  return await executeQuery(query, [user_id, cart_id]);
};

const getUserOrdersFromDb = async (user_id) => {
  const query = `SELECT * FROM orders WHERE user_id = ?`;
  return await executeQuery(query, [user_id]);
};

module.exports = {
  getCartItemsFromDb,
  insertOrderInDb,
  insertOrderItemsInDb,
  clearCartInDb,
  getUserOrdersFromDb,
};
