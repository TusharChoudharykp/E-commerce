const {
  getAllProductsFromDb,
  getProductByIdFromDb,
  insertProductToDb,
  updateProductInDb,
  deleteProductFromDb,
  searchProductsInDb,
} = require("../db/productDb");

const getAllProductsService = async () => {
  return await getAllProductsFromDb();
};

const getProductByIdService = async (id) => {
  return await getProductByIdFromDb(id);
};

const createProductService = async (productData) => {
  console.log("Creating product with data:", productData);

  if (
    !productData.name ||
    !productData.description ||
    !productData.price ||
    !productData.category_id
  ) {
    throw new Error(
      "Missing required fields: name, description, price, or category_id."
    );
  }

  const result = await insertProductToDb(productData);

  if (result && result.insertId) {
    console.log("Product created successfully with ID:", result.insertId);
    return result;
  } else {
    throw new Error("Failed to create product.");
  }
};

const updateProductService = async (id, productData) => {
  return await updateProductInDb(id, productData);
};

const deleteProductService = async (id) => {
  return await deleteProductFromDb(id);
};

const searchProductsService = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim().length === 0) {
    throw new Error("Search term is required");
  }
  return await searchProductsInDb(searchTerm);
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  searchProductsService,
};

// const executeQuery = require("../models/executeQuery");

// // Get all products
// const getAllProductsService = async () => {
//   const query = "SELECT * FROM products";
//   const products = await executeQuery(query);
//   return products;
// };

// // Get product by id
// const getProductByIdService = async (id) => {
//   const query = "SELECT * FROM products WHERE id = ?";
//   const product = await executeQuery(query, [id]);
//   return product;
// };

// // Create product
// const createProductService = async (productData) => {
//   const {
//     name,
//     description,
//     richDescription,
//     image,
//     brand,
//     price,
//     category_id,
//     countInStock,
//     rating,
//     numReviews,
//     isFeatured,
//   } = productData;

//   // Log input for debugging
//   console.log("Creating product with data:", productData);

//   if (!name || !description || !price || !category_id) {
//     throw new Error(
//       "Missing required fields: name, description, price, or category_id."
//     );
//   }

//   const query = `INSERT INTO products (name, description, richDescription, image, brand, price, category_id, countInStock, rating, numReviews, isFeatured)
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   try {
//     const result = await executeQuery(query, [
//       name,
//       description,
//       richDescription || null,
//       image || null,
//       brand || null,
//       price,
//       category_id,
//       countInStock,
//       rating || null,
//       numReviews || 0,
//       isFeatured || 0,
//     ]);

//     // Check if the insert was successful
//     if (result && result.insertId) {
//       console.log("Product created successfully with ID:", result.insertId);
//       return result;
//     } else {
//       throw new Error("Failed to create product.");
//     }
//   } catch (error) {
//     console.error("Error creating product:", error.message);
//     throw error;
//   }
// };

// // Update product
// const updateProductService = async (id, productData) => {
//   const {
//     name,
//     description,
//     richDescription,
//     image,
//     brand,
//     price,
//     category_id,
//     countInStock,
//     rating,
//     numReviews,
//     isFeatured,
//   } = productData;

//   const query = `UPDATE products SET name = ?, description = ?, richDescription = ?, image = ?, brand = ?, price = ?, category_id = ?, countInStock = ?, rating = ?, numReviews = ?, isFeatured = ? WHERE id = ?`;

//   const result = await executeQuery(query, [
//     name,
//     description,
//     richDescription || null,
//     image || null,
//     brand || null,
//     price,
//     category_id,
//     countInStock,
//     rating || null,
//     numReviews || 0,
//     isFeatured || 0,
//     id,
//   ]);

//   return result;
// };

// // Delete product
// const deleteProductService = async (id) => {
//   const query = "DELETE FROM products WHERE id = ?";
//   const result = await executeQuery(query, [id]);
//   return result;
// };

// // Search products
// const searchProductsService = async (searchTerm) => {
//   const query = `SELECT id, name, description, price, image FROM products WHERE name LIKE ? OR description LIKE ?`;
//   const searchQuery = `%${searchTerm}%`;

//   if (!searchTerm || searchTerm.trim().length === 0) {
//     throw new Error("Search term is required");
//   }

//   const products = await executeQuery(query, [searchQuery, searchQuery]);
//   return products;
// };

// module.exports = {
//   getAllProductsService,
//   getProductByIdService,
//   createProductService,
//   updateProductService,
//   deleteProductService,
//   searchProductsService,
// };
