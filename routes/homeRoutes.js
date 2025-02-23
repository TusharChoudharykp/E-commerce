const express = require("express");
const router = express.Router();

const { getHomeDashboardController } = require("../controllers/homeController");

router.get("/", getHomeDashboardController); // GET /api/home

module.exports = router;
