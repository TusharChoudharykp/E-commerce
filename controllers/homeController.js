const { getHomeDashboardService } = require("../services/homeService");

const getHomeDashboardController = async (req, res) => {
  try {
    const dashboardData = await getHomeDashboardService();
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching home dashboard:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getHomeDashboardController };
