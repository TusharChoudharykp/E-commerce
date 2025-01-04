const connection = require('../connect'); 
const express = require('express');
const router = express.Router();
const {insertUser} = require('../models/user');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM users'; 

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ success: false, error: err.message });
        }

        // Respond with the list of users
        res.status(200).json({ success: true, data: results });
    });
});

module.exports = router;
