const executeQuery = require("../models/executeQuery");

//get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await executeQuery("SELECT * FROM products");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

//get product by id
const getProductById = async (req, res) => {
  try {
    const product = await executeQuery("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (!product.length)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product[0]);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

//create product
const createProduct = async (req, res) => {
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
  } = req.body;

  if (
    !name ||
    !description ||
    !category_id ||
    countInStock === undefined ||
    price === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // Check if category exists
    const category = await executeQuery(
      "SELECT id FROM categories WHERE id = ?",
      [category_id]
    );
    if (!category.length)
      return res
        .status(400)
        .json({ success: false, message: "Invalid category_id" });

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

    res.status(201).json({
      success: true,
      product: {
        id: result.insertId,
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
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

//update product
const updateProduct = async (req, res) => {
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
  } = req.body;

  if (
    !name ||
    !description ||
    !category_id ||
    countInStock === undefined ||
    price === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // Check if category exists
    const category = await executeQuery(
      "SELECT id FROM categories WHERE id = ?",
      [category_id]
    );
    if (!category.length)
      return res
        .status(400)
        .json({ success: false, message: "Invalid category_id" });

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
      req.params.id,
    ]);

    if (!result.affectedRows)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const result = await executeQuery("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

//get featured count
const getFeaturedProducts = async (req, res) => {
  const count = parseInt(req.params.count) || 0;
  try {
    const products = await executeQuery(
      "SELECT * FROM products WHERE isFeatured = true LIMIT ?",
      [count]
    );
    if (!products.length)
      return res.status(404).json({ message: "No featured products found" });
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch featured products" });
  }
};

//get product count
const getProductCount = async (req, res) => {
  try {
    const result = await executeQuery("SELECT COUNT(*) AS count FROM products");
    res.status(200).json({ success: true, count: result[0].count });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product count" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductCount,
};
