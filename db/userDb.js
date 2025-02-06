const executeQuery = require("../models/executeQuery");

const getAllUsersFromDb = async () => {
  return await executeQuery(
    "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users"
  );
};

const getUserByIdFromDb = async (id) => {
  return await executeQuery(
    "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?",
    [id]
  );
};

const getUserByEmail = async (email) => {
  return await executeQuery("SELECT * FROM users WHERE email = ?", [email]);
};

const insertUser = async (userData) => {
  const {
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
  } = userData;

  return await executeQuery(
    `INSERT INTO users (name, email, passwordHash, phone, isAdmin, landmark, flatnumber, pincode, city, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

    [
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
    ]
  );
};

const updateUserInDb = async (id, userData) => {
  const {
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
  } = userData;

  return await executeQuery(
    `UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, isAdmin = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?`,
    [
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
      id,
    ]
  );
};

const deleteUserFromDb = async (id) => {
  return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
};

const getUserCountFromDb = async () => {
  return await executeQuery("SELECT COUNT(*) AS userCount FROM users");
};

module.exports = {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmail,
  insertUser,
  updateUserInDb,
  deleteUserFromDb,
  getUserCountFromDb,
};
