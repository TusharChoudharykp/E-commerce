const mysql2 = require('mysql2');

const insertOrder = (productId, userId, quantity, totalPrice) => {
    const query = `INSERT INTO orders (product_id, user_id, quantity, total_price) VALUES (?, ?, ?, ?)`;
    connection.query(query, [productId, userId, quantity, totalPrice], (err, results) => {
        if (err) {
            console.error('Error inserting order:', err);
            return;
        }
        console.log('Order inserted with ID:', results.insertId);
    });
};

// Fetch all orders
const getOrders = () => {
    const query = `SELECT * FROM orders`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return;
        }
        console.log('Orders:', results);
    });
};

module.exports = insertOrder;