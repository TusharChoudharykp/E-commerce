const executeQuery = require("../models/executeQuery");

const getCartItemsFromDb = async (userId) => {
  const query = `
    SELECT c.id, c.user_id, c.product_id, c.quantity, p.name AS product_name, p.price, p.image 
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?;
  `;
  return await executeQuery(query, [userId]);
};

const checkCartItemInDb = async (user_id, product_id) => {
  const query = `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`;
  return await executeQuery(query, [user_id, product_id]);
};

const updateCartItemQuantityInDb = async (quantity, user_id, product_id) => {
  const query = `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;
  return await executeQuery(query, [quantity, user_id, product_id]);
};

const insertCartItemInDb = async (user_id, product_id, quantity) => {
  const query = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
  return await executeQuery(query, [user_id, product_id, quantity]);
};

const updateCartItemInDb = async (id, quantity) => {
  const query = `UPDATE cart SET quantity = ? WHERE id = ?`;
  return await executeQuery(query, [quantity, id]);
};

const removeCartItemFromDb = async (id) => {
  const query = `DELETE FROM cart WHERE id = ?`;
  return await executeQuery(query, [id]);
};

module.exports = {
  getCartItemsFromDb,
  checkCartItemInDb,
  updateCartItemQuantityInDb,
  insertCartItemInDb,
  updateCartItemInDb,
  removeCartItemFromDb,
};
