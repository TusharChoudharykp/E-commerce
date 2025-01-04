const connection = require('../connect'); 
const express = require('express');
const router = express.Router();
const insertProduct = require('../models/product');

// GET route to fetch products
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products'; 

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Send the products as a JSON response
    });
});

// POST route to insert a product
router.post('/', (req, res) => {
    const {
        name = "",
        description = "",
        richDescription = "",
        image = "",
        brand = "",
        price = 0,
        category_id = "",
        countInStock = "",
        rating = 0,
        numReviews = 0,
        isFeatured = false,
    } = req.body;

    // Check if required fields are provided
    if (!name || !description || !category_id || countInStock === undefined) {
        return res.status(400).json({
            error: 'Name, description, category_id, and countInStock are required.',
        });
    }

    // Check if the category_id exists in the categories table
    const checkCategoryQuery = 'SELECT * FROM categories WHERE id = ?';
    connection.query(checkCategoryQuery, [category_id], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(400).json({
                error: 'Invalid category_id. Category does not exist.',
            });
        }

        // Call the insertProduct function if category exists
        insertProduct(
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
        );

        // Respond to the client
        res.status(201).json({
            message: 'Product inserted successfully!',
            product: {
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
            },
        });
    });
});

module.exports = router;
