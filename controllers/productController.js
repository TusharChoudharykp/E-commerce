const {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  searchProductsService,
} = require("../services/productServices");

// Helper function to check if the user is an admin
const isAdmin = (user) => user.role === "admin";

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// Get product by id
const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ success: true, product: product[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

// Create product (Admin only)
const createProduct = async (req, res) => {
  console.log("User data:", req.user); // Log user data for debugging purposes

  try {
    // Check if the user is an admin
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await createProductService(req.body);

    if (result && result.insertId) {
      res.status(201).json({
        success: true,
        product: { id: result.insertId, ...req.body },
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Product creation failed" });
    }
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// Update product (Admin only)
const updateProduct = async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await updateProductService(req.params.id, req.body);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

// Delete product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await deleteProductService(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

// Search products
const searchProducts = async (req, res) => {
  const { searchTerm } = req.query;
  if (!searchTerm) {
    return res
      .status(400)
      .json({ success: false, message: "Search term is required" });
  }

  try {
    const products = await searchProductsService(searchTerm);
    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to search products" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};

// const {
//   getAllProductsService,
//   getProductByIdService,
//   createProductService,
//   updateProductService,
//   deleteProductService,
//   searchProductsService,
// } = require("../services/productServices");

// // Get all products
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await getAllProductsService();
//     res.status(200).json({ success: true, products });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch products" });
//   }
// };

// // Get product by id
// const getProductById = async (req, res) => {
//   try {
//     const product = await getProductByIdService(req.params.id);
//     if (!product.length)
//       return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ success: true, product: product[0] });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error fetching product" });
//   }
// };

// // Create product
// const createProduct = async (req, res) => {
//   try {
//     const result = await createProductService(req.body);
//     res.status(201).json({
//       success: true,
//       product: { id: result.insertId, ...req.body },
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to create product" });
//   }
// };

// // Update product
// const updateProduct = async (req, res) => {
//   try {
//     const result = await updateProductService(req.params.id, req.body);
//     if (!result.affectedRows)
//       return res.status(404).json({ message: "Product not found" });
//     res
//       .status(200)
//       .json({ success: true, message: "Product updated successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update product" });
//   }
// };

// // Delete product
// const deleteProduct = async (req, res) => {
//   try {
//     const result = await deleteProductService(req.params.id);
//     if (!result.affectedRows)
//       return res.status(404).json({ message: "Product not found" });
//     res
//       .status(200)
//       .json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete product" });
//   }
// };

// // Search products
// const searchProducts = async (req, res) => {
//   const { searchTerm } = req.query;
//   if (!searchTerm) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Search term is required" });
//   }

//   try {
//     const products = await searchProductsService(searchTerm);
//     if (!products.length) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No products found" });
//     }
//     res.status(200).json({ success: true, products });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to search products" });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   searchProducts,
// };
