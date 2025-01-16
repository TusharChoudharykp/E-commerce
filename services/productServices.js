const executeQuery = require("../models/executeQuery");

// Get all products
const getAllProductsService = async () => {
  const query = "SELECT * FROM products";
  const products = await executeQuery(query);
  return products;
};

// Get product by id
const getProductByIdService = async (id) => {
  const query = "SELECT * FROM products WHERE id = ?";
  const product = await executeQuery(query, [id]);
  return product;
};

// Create product
const createProductService = async (productData) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category_id,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = productData;

  const query = `INSERT INTO products (name, description, richDescription, image, brand, price, category_id, countInStock, rating, numReviews, isFeatured)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const result = await executeQuery(query, [
    name,
    description,
    richDescription || null,
    image || null,
    brand || null,
    price,
    category_id,
    countInStock,
    rating || null,
    numReviews || 0,
    isFeatured || 0,
  ]);

  return result;
};

// Update product
const updateProductService = async (id, productData) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category_id,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = productData;

  const query = `UPDATE products SET name = ?, description = ?, richDescription = ?, image = ?, brand = ?, price = ?, category_id = ?, countInStock = ?, rating = ?, numReviews = ?, isFeatured = ? WHERE id = ?`;

  const result = await executeQuery(query, [
    name,
    description,
    richDescription || null,
    image || null,
    brand || null,
    price,
    category_id,
    countInStock,
    rating || null,
    numReviews || 0,
    isFeatured || 0,
    id,
  ]);

  return result;
};

// Delete product
const deleteProductService = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  const result = await executeQuery(query, [id]);
  return result;
};

// Get featured products with a limit
const getFeaturedProductsService = async (count) => {
  const query = "SELECT * FROM products WHERE isFeatured = true LIMIT ?";
  const products = await executeQuery(query, [count]);
  return products;
};

// Get product count
const getProductCountService = async () => {
  const query = "SELECT COUNT(*) AS count FROM products";
  const result = await executeQuery(query);
  return result[0].count;
};

// Search products
const searchProductsService = async (searchTerm) => {
  const query = `SELECT id, name, description, price, image FROM products WHERE name LIKE ? OR description LIKE ?`;
  const searchQuery = `%${searchTerm}%`;
  const products = await executeQuery(query, [searchQuery, searchQuery]);
  return products;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  getFeaturedProductsService,
  getProductCountService,
  searchProductsService,
};
