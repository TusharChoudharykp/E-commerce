const executeQuery = require("../models/executeQuery");

const getPopularProductsService = async () => {
  const query = `
    SELECT id, name, description, price, image
    FROM products
    ORDER BY price DESC  
    LIMIT 10;
  `;

  const products = await executeQuery(query);
  return products;
};

module.exports = { getPopularProductsService };
