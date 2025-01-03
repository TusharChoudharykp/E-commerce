const mysql2 = require('mysql2');
const connection = require('../connect'); // Import the database connection

const insertProduct = (name, image, countInstock) => {
    const query = 'INSERT INTO Product (name, image, countInstock) VALUES (?, ?, ?)';
    connection.query(query, [name, image, countInstock], (err, results) => {
        if (err) {
            console.error('Error inserting product:', err);
            return;
        }
        console.log('Product inserted with ID:', results.insertId);
    });
};

module.exports = insertProduct;
