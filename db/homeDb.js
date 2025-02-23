const executeQuery = require("../models/executeQuery");

const getFeaturedProductsFromDb = async () => {
  const query =
    "SELECT id, name, price, image FROM products WHERE isFeatured = 1 LIMIT 10";
  return await executeQuery(query);
};

const getPopularProductsFromDb = async () => {
  const query = `
    SELECT p.id, p.name, p.price, p.image, SUM(o.quantity) AS total_sold
    FROM order_items o
    JOIN products p ON o.product_id = p.id
    GROUP BY o.product_id
    ORDER BY total_sold DESC
    LIMIT 10;
  `;
  return await executeQuery(query);
};

module.exports = {
  getFeaturedProductsFromDb,
  getPopularProductsFromDb,
};
