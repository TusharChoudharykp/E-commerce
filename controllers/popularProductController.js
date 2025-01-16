const {
  getPopularProductsService,
} = require("../services/popularProductService");

const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await getPopularProductsService();
    res.status(200).json({ success: true, popularProducts });
  } catch (err) {
    console.error("Error fetching popular products:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular products",
      error: err.message,
    });
  }
};

module.exports = { getPopularProducts };
