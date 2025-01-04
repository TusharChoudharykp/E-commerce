const mysql2 = require('mysql2');

const insertUser = (name, image, countInStock) => {
    const query = `INSERT INTO users (name, image, countInStock) VALUES (?, ?, ?)`;
    connection.query(query, [name, image, countInStock], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return;
        }
        console.log('User inserted with ID:', results.insertId);
    });
};

// Fetch all users
const getUsers = () => {
    const query = `SELECT * FROM users`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return;
        }
        console.log('Users:', results);
    });
};

module.exports = insertUser;