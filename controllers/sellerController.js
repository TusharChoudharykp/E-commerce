const {
  createSellerService,
  updateSellerService,
  deleteSellerService,
} = require("../services/sellerService");

// Create a seller (only accessible by admin)
const createSeller = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const seller = await createSellerService(req.body);
    if (!seller) {
      return res.status(400).json({ message: "Failed to create seller." });
    }
    res.status(201).json({ success: true, seller });
  } catch (err) {
    console.error("Error creating seller:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to create seller",
      error: err.message,
    });
  }
};

// Update seller
const updateSeller = async (req, res) => {
  try {
    const seller = await updateSellerService(req.params.id, req.body);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Seller updated successfully" });
  } catch (err) {
    console.error("Error updating seller:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update seller",
      error: err.message,
    });
  }
};

// Delete seller
const deleteSeller = async (req, res) => {
  try {
    const seller = await deleteSellerService(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Seller deleted successfully" });
  } catch (err) {
    console.error("Error deleting seller:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete seller",
      error: err.message,
    });
  }
};

module.exports = {
  createSeller,
  updateSeller,
  deleteSeller,
};
