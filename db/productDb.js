const executeQuery = require("../models/executeQuery");

const getAllProductsFromDb = async () => {
  const query = "SELECT * FROM products";
  return await executeQuery(query);
};

const getProductByIdFromDb = async (id) => {
  const query = "SELECT * FROM products WHERE id = ?";
  return await executeQuery(query, [id]);
};

const insertProductToDb = async (productData) => {
  const query = `INSERT INTO products (name, description, richDescription, image, brand, price, category_id, countInStock, rating, numReviews, isFeatured)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  return await executeQuery(query, [
    productData.name,
    productData.description,
    productData.richDescription || null,
    productData.image || null,
    productData.brand || null,
    productData.price,
    productData.category_id,
    productData.countInStock,
    productData.rating || null,
    productData.numReviews || 0,
    productData.isFeatured || 0,
  ]);
};

const updateProductInDb = async (id, productData) => {
  const query = `UPDATE products SET name = ?, description = ?, richDescription = ?, image = ?, brand = ?, price = ?, category_id = ?, countInStock = ?, rating = ?, numReviews = ?, isFeatured = ? WHERE id = ?`;

  return await executeQuery(query, [
    productData.name,
    productData.description,
    productData.richDescription || null,
    productData.image || null,
    productData.brand || null,
    productData.price,
    productData.category_id,
    productData.countInStock,
    productData.rating || null,
    productData.numReviews || 0,
    productData.isFeatured || 0,
    id,
  ]);
};

const deleteProductFromDb = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  return await executeQuery(query, [id]);
};

const searchProductsInDb = async (searchTerm) => {
  const query = `SELECT id, name, description, price, image FROM products WHERE name LIKE ? OR description LIKE ?`;
  const searchQuery = `%${searchTerm}%`;
  return await executeQuery(query, [searchQuery, searchQuery]);
};

module.exports = {
  getAllProductsFromDb,
  getProductByIdFromDb,
  insertProductToDb,
  updateProductInDb,
  deleteProductFromDb,
  searchProductsInDb,
};
