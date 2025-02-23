const {
  getFeaturedProductsFromDb,
  getPopularProductsFromDb,
} = require("../db/homeDb");

const getHomeDashboardService = async () => {
  const featuredProducts = await getFeaturedProductsFromDb();
  const popularProducts = await getPopularProductsFromDb();

  return {
    featuredProducts,
    popularProducts,
  };
};

module.exports = { getHomeDashboardService };
