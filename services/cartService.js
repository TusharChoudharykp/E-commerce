const {
  getCartItemsFromDb,
  checkCartItemInDb,
  updateCartItemQuantityInDb,
  insertCartItemInDb,
  updateCartItemInDb,
  removeCartItemFromDb,
} = require("../db/cartDb");

const getCartItemsService = async (userId) => {
  return await getCartItemsFromDb(userId);
};

const addToCartService = async (cartData) => {
  const { user_id, product_id, quantity } = cartData;

  const existingCartItem = await checkCartItemInDb(user_id, product_id);

  if (existingCartItem.length > 0) {
    await updateCartItemQuantityInDb(quantity, user_id, product_id);
    return { message: "Cart item quantity updated" };
  } else {
    return await insertCartItemInDb(user_id, product_id, quantity);
  }
};

const updateCartItemService = async (id, quantity) => {
  return await updateCartItemInDb(id, quantity);
};

const removeCartItemService = async (id) => {
  return await removeCartItemFromDb(id);
};

module.exports = {
  getCartItemsService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
};

// const executeQuery = require("../models/executeQuery");

// // Get all cart items for a user
// const getCartItemsService = async (userId) => {
//   const query = `
//     SELECT c.id, c.user_id, c.product_id, c.quantity, p.name AS product_name, p.price, p.image
//     FROM cart c
//     JOIN products p ON c.product_id = p.id
//     WHERE c.user_id = ?;
//   `;
//   const cartItems = await executeQuery(query, [userId]);
//   return cartItems;
// };

// // Add a product to the cart
// const addToCartService = async (cartData) => {
//   const { user_id, product_id, quantity } = cartData;

//   // Check if product already exists in cart
//   const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`;
//   const existingCartItem = await executeQuery(checkQuery, [
//     user_id,
//     product_id,
//   ]);

//   if (existingCartItem.length > 0) {
//     // If product exists, update the quantity
//     const updateQuery = `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?`;
//     await executeQuery(updateQuery, [quantity, user_id, product_id]);
//     return { message: "Cart item quantity updated" };
//   } else {
//     // If product does not exist, insert new record
//     const insertQuery = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
//     const result = await executeQuery(insertQuery, [
//       user_id,
//       product_id,
//       quantity,
//     ]);
//     return result;
//   }
// };

// // Update cart item quantity
// const updateCartItemService = async (id, quantity) => {
//   const query = `UPDATE cart SET quantity = ? WHERE id = ?`;
//   const result = await executeQuery(query, [quantity, id]);
//   return result;
// };

// // Remove a product from the cart
// const removeCartItemService = async (id) => {
//   const query = `DELETE FROM cart WHERE id = ?`;
//   const result = await executeQuery(query, [id]);
//   return result;
// };

// module.exports = {
//   getCartItemsService,
//   addToCartService,
//   updateCartItemService,
//   removeCartItemService,
// };
