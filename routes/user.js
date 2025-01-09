const connection = require("../connect");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Utility function for query execution
const executeQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// Get all users (excluding passwordHash)
router.get("/", async (req, res) => {
  try {
    const results = await executeQuery(
      "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users"
    );
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const results = await executeQuery(
      "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?",
      [req.params.id]
    );
    if (!results.length)
      return res.status(404).json({ message: "User not found." });
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user by ID." });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  const isAdminInt = isAdmin ? 1 : 0;
  try {
    const query = `INSERT INTO users (name, email, passwordHash, phone, isAdmin, landmark, flatnumber, pincode, city, state) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const results = await executeQuery(query, [
      name,
      email,
      passwordHash,
      phone,
      isAdminInt,
      landmark || "",
      flatnumber || "",
      pincode || "",
      city || "",
      state || "",
    ]);
    res.status(201).json({ id: results.insertId, ...req.body });
  } catch (err) {
    res.status(500).send("Error creating user.");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password are required.");
  try {
    const results = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!results.length) return res.status(400).send("User not found.");
    const user = results[0];
    if (!bcrypt.compareSync(password, user.passwordHash))
      return res.status(400).send("Incorrect password.");
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token });
  } catch (err) {
    res.status(500).send("Error checking user in database.");
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  } = req.body;
  const passwordHash = password ? bcrypt.hashSync(password, 10) : undefined;
  const isAdminInt = isAdmin ? 1 : 0;
  try {
    const query =
      "UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, isAdmin = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?";
    await executeQuery(query, [
      name,
      email,
      passwordHash,
      phone,
      isAdminInt,
      landmark,
      flatnumber,
      pincode,
      city,
      state,
      req.params.id,
    ]);
    res.status(200).send("User updated.");
  } catch (err) {
    res.status(500).send("Error updating user.");
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const results = await executeQuery("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (results.affectedRows === 0)
      return res.status(404).send("User not found.");
    res.status(200).send("User deleted.");
  } catch (err) {
    res.status(500).send("Error deleting user.");
  }
});

// Get user count
router.get("/get/count", async (req, res) => {
  try {
    const results = await executeQuery(
      "SELECT COUNT(*) AS userCount FROM users"
    );
    res.status(200).json({ userCount: results[0].userCount });
  } catch (err) {
    res.status(500).send("Error fetching user count.");
  }
});

module.exports = router;
