const mysql2 = require('mysql2');
const connection = require('../connect');  // Import the database connection

const insertCategory = (name, icon, color) => {
    const query = 'INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)';
    connection.query(query, [name, icon, color], (err, results) => {
        if (err) {
            console.error('Error inserting category:', err);
            return;
        }
        console.log('Category inserted with ID:', results.insertId);
    });
};

const getCategories = (callback) => {
    const query = 'SELECT * FROM categories';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return callback(err, null);
        }
        callback(null, results);  // Return the results in the callback
    });
};

module.exports = { insertCategory, getCategories };
