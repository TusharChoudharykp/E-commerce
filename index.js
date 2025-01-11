const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
const PORT = 8000;
app.use(bodyParser.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something broke!" });
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
