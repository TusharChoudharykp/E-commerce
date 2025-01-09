const mysql2 = require("mysql2");
const connection = require("../connect"); // Import the database connection

const insertProduct = (
  name,
  description,
  richDescription,
  image,
  brand,
  price,
  category_id,
  countInStock,
  rating,
  numReviews,
  isFeatured
) => {
  const query = `INSERT INTO products (name, description, richDescription, image, brand, price, category_id, countInStock, rating, numReviews, isFeatured) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category_id,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting product:", err);
        return;
      }
      console.log("Product inserted with ID:", results.insertId);
    }
  );
};

module.exports = insertProduct;
