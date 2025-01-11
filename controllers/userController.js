const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const executeQuery = require("../models/executeQuery");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await executeQuery(
      "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users"
    );
    console.log("GET /api/users - Success");
    res.status(200).json(users);
  } catch (err) {
    console.log("GET /api/users - Failed", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const user = await executeQuery(
      "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?",
      [req.params.id]
    );
    if (!user.length) {
      console.log(`GET /api/users/${req.params.id} - User not found`);
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`GET /api/users/${req.params.id} - Success`);
    res.status(200).json(user[0]);
  } catch (err) {
    console.log(`GET /api/users/${req.params.id} - Failed`, err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};

//register user
const registerUser = async (req, res) => {
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

  if (!name || !email || !password || !phone) {
    console.log("POST /api/users/register - Failed (Missing required fields)");
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const existingUser = await executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length) {
      console.log("POST /api/users/register - Failed (Email already in use)");
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const isAdminInt = isAdmin ? 1 : 0;
    const query = `INSERT INTO users (name, email, passwordHash, phone, isAdmin, landmark, flatnumber, pincode, city, state)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await executeQuery(query, [
      name,
      email,
      hashedPassword,
      phone,
      isAdminInt,
      landmark || "",
      flatnumber || "",
      pincode || "",
      city || "",
      state || "",
    ]);

    console.log(
      `POST /api/users/register - Success (User ID: ${result.insertId})`
    );
    res.status(201).json({
      success: true,
      user: { id: result.insertId, name, email, phone, isAdmin },
    });
  } catch (err) {
    console.log("POST /api/users/register - Failed", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("POST /api/users/login - Failed (Missing credentials)");
    return res
      .status(400)
      .json({ success: false, message: "Missing credentials" });
  }

  try {
    const user = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!user.length) {
      console.log("POST /api/users/login - Failed (User not found)");
      return res.status(404).json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user[0].passwordHash)) {
      console.log("POST /api/users/login - Failed (Invalid credentials)");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user[0].id, isAdmin: user[0].isAdmin },
      process.env.secret,
      { expiresIn: "3d" }
    );

    console.log(`POST /api/users/login - Success (User: ${user[0].email})`);
    res
      .status(200)
      .json({ success: true, user: { email: user[0].email }, token });
  } catch (err) {
    console.log("POST /api/users/login - Failed", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to log in user",
      error: err.message,
    });
  }
};

//update user
const updateUser = async (req, res) => {
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

  try {
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    const isAdminInt = isAdmin ? 1 : 0;
    const query = `UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, isAdmin = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?`;

    const result = await executeQuery(query, [
      name,
      email,
      hashedPassword,
      phone,
      isAdminInt,
      landmark,
      flatnumber,
      pincode,
      city,
      state,
      req.params.id,
    ]);

    if (!result.affectedRows) {
      console.log(`PUT /api/users/${req.params.id} - Failed (User not found)`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`PUT /api/users/${req.params.id} - Success`);
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.log(`PUT /api/users/${req.params.id} - Failed`, err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

//user delete
const deleteUser = async (req, res) => {
  try {
    const result = await executeQuery("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (!result.affectedRows) {
      console.log(
        `DELETE /api/users/${req.params.id} - Failed (User not found)`
      );
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`DELETE /api/users/${req.params.id} - Success`);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.log(`DELETE /api/users/${req.params.id} - Failed`, err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

//get user count
const getUserCount = async (req, res) => {
  try {
    const result = await executeQuery(
      "SELECT COUNT(*) AS userCount FROM users"
    );
    console.log("GET /api/users/count - Success");
    res.status(200).json({ success: true, userCount: result[0].userCount });
  } catch (err) {
    console.log("GET /api/users/count - Failed", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user count",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserCount,
};
