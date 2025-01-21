const express = require("express");
const {
  createSeller,
  updateSeller,
  deleteSeller,
} = require("../controllers/sellerController");

const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

// Create seller (only accessible by admin)
router.post("/", authenticateJWT, createSeller);

// Update seller (accessible by admin)
router.put("/:id", authenticateJWT, updateSeller);

// Delete seller (accessible by admin)
router.delete("/:id", authenticateJWT, deleteSeller);

module.exports = router;
