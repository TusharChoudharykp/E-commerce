const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/:user_id", getUserOrders);

module.exports = router;
