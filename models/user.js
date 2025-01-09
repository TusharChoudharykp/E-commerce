const mysql2 = require("mysql2");

const insertUser = (name, email, passwordHash, phone, isAdmin, callback) => {
  const query = `INSERT INTO users (name, email, password_hash, phone, is_admin) VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [name, email, passwordHash, phone, isAdmin],
    (err, results) => {
      if (err) {
        console.error("Error inserting user:", err.message);
        callback(err, null);
        return;
      }
      console.log("User inserted with ID:", results.insertId);
      callback(null, results.insertId);
    }
  );
};

// Fetch all users
const getUsers = (callback) => {
  const query = `SELECT * FROM users`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      callback(err, null);
      return;
    }
    console.log("Users:", results);
    callback(null, results);
  });
};

// Fetch a single user by ID
const getUserById = (id, callback) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user by ID:", err.message);
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      console.log("No user found with the given ID.");
      callback(null, null);
      return;
    }
    console.log("User:", results[0]);
    callback(null, results[0]);
  });
};

// Delete a user by ID
const deleteUserById = (id, callback) => {
  const query = `DELETE FROM users WHERE id = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      callback(err, null);
      return;
    }
    console.log("Deleted user with ID:", id);
    callback(null, results);
  });
};

// Update a user by ID
const updateUserById = (id, fields, callback) => {
  const query = `UPDATE users SET ? WHERE id = ?`;
  connection.query(query, [fields, id], (err, results) => {
    if (err) {
      console.error("Error updating user:", err.message);
      callback(err, null);
      return;
    }
    console.log("Updated user with ID:", id);
    callback(null, results);
  });
};

module.exports = {
  insertUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
