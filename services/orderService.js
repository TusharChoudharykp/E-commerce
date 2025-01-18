const executeQuery = require("../models/executeQuery");

const placeOrderService = async (user_id, cart_id) => {
  const cartQuery = `
    SELECT c.product_id, c.quantity, p.price 
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ? AND c.id = ?;
  `;

  const cartItems = await executeQuery(cartQuery, [user_id, cart_id]);

  if (!cartItems.length) {
    throw new Error("Cart is empty. Please add items before ordering.");
  }

  let totalAmount = 0;
  for (let item of cartItems) {
    totalAmount += item.quantity * item.price;
  }

  const orderQuery = `
    INSERT INTO orders (user_id, cart_id, total_amount, status) 
    VALUES (?, ?, ?, 'Pending');
  `;
  const orderResult = await executeQuery(orderQuery, [
    user_id,
    cart_id,
    totalAmount,
  ]);

  const orderId = orderResult.insertId;

  const clearCartQuery = `DELETE FROM cart WHERE user_id = ? AND id = ?`;
  await executeQuery(clearCartQuery, [user_id, cart_id]);

  return { orderId, totalAmount, message: "Order placed successfully!" };
};

const getUserOrdersService = async (user_id) => {
  const query = `SELECT * FROM orders WHERE user_id = ?`;
  return await executeQuery(query, [user_id]);
};

module.exports = {
  placeOrderService,
  getUserOrdersService,
};
