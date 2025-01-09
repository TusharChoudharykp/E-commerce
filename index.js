const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { insertProduct } = require("./models/product");
const { insertCategory, getCategories } = require("./models/category");
const {
  insertUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("./models/user");
const connection = require("./connect");
const mysql2 = require("mysql2");

//routes
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(`/products`, productRouter);
app.use(`/categories`, categoryRouter);
app.use(`/users`, userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
