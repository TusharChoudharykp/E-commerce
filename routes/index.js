const express = require("express");
const router = express.Router();

const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const popularProductRoutes = require("./popularProductRoutes");
const sellerRoutes = require("./sellerRoutes");

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/popular", popularProductRoutes);
router.use("/sellers", sellerRoutes);

module.exports = router;
