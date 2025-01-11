const connection = require("../connect");
const express = require("express");
const router = express.Router();
const { insertorder } = require("../models/order");

router.get("/", (req, res) => {
  const query = "SELECT * FROM orders";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Respond with the list of orders
    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
