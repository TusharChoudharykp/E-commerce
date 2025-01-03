const Product = require('../models/product');
const express = require('express');
const router = express.Router();

// GET route
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Product'; // SQL query to get all products
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Send the products as a JSON response
    });
});

// POST /products route to insert a product into the database
router.post('/', (req, res) => {
    const { name, image, countInstock } = req.body;

    // Call the insertProduct function
    insertProduct(name, image, countInstock);

    // Respond to the client
    res.status(201).json({
        message: 'Product inserted successfully!',
        product: { name, image, countInstock },
    });
});

module.exports = router;