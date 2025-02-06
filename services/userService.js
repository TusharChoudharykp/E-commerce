const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getAllUsersFromDb,
  getUserByIdFromDb,
  getUserByEmail,
  insertUser,
  updateUserInDb,
  deleteUserFromDb,
  getUserCountFromDb,
} = require("../db/userDb");

const getAllUsers = async () => {
  return await getAllUsersFromDb();
};

const getUserById = async (id) => {
  return await getUserByIdFromDb(id);
};

const registerUser = async (userData) => {
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
  } = userData;

  const existingUser = await getUserByEmail(email);
  if (existingUser.length) {
    throw new Error("Email already in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const isAdminInt = isAdmin ? 1 : 0;

  return await insertUser({
    name,
    email,
    passwordHash: hashedPassword,
    phone,
    isAdminInt,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user.length || !bcrypt.compareSync(password, user[0].passwordHash)) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user[0].id, isAdmin: user[0].isAdmin },
    process.env.secret,
    { expiresIn: "3d" }
  );

  return { email: user[0].email, token };
};

const updateUser = async (id, userData) => {
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
  } = userData;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
  const isAdminInt = isAdmin ? 1 : 0;

  return await updateUserInDb(id, {
    name,
    email,
    passwordHash: hashedPassword,
    phone,
    isAdminInt,
    landmark,
    flatnumber,
    pincode,
    city,
    state,
  });
};

const deleteUser = async (id) => {
  return await deleteUserFromDb(id);
};

const getUserCount = async () => {
  return await getUserCountFromDb();
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

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const executeQuery = require("../models/executeQuery");

// const getAllUsers = async () => {
//   return await executeQuery(
//     "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users"
//   );
// };

// const getUserById = async (id) => {
//   return await executeQuery(
//     "SELECT id, name, email, phone, isAdmin, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?",
//     [id]
//   );
// };

// const registerUser = async (userData) => {
//   const {
//     name,
//     email,
//     password,
//     phone,
//     isAdmin,
//     landmark,
//     flatnumber,
//     pincode,
//     city,
//     state,
//   } = userData;

//   const existingUser = await executeQuery(
//     "SELECT * FROM users WHERE email = ?",
//     [email]
//   );
//   if (existingUser.length) {
//     throw new Error("Email already in use");
//   }

//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const isAdminInt = isAdmin ? 1 : 0;

//   return await executeQuery(
//     `INSERT INTO users (name, email, passwordHash, phone, isAdmin, landmark, flatnumber, pincode, city, state)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       name,
//       email,
//       hashedPassword,
//       phone,
//       isAdminInt,
//       landmark || "",
//       flatnumber || "",
//       pincode || "",
//       city || "",
//       state || "",
//     ]
//   );
// };

// const loginUser = async (email, password) => {
//   const user = await executeQuery("SELECT * FROM users WHERE email = ?", [
//     email,
//   ]);
//   if (!user.length || !bcrypt.compareSync(password, user[0].passwordHash)) {
//     throw new Error("Invalid credentials");
//   }

//   const token = jwt.sign(
//     { userId: user[0].id, isAdmin: user[0].isAdmin },
//     process.env.secret,
//     { expiresIn: "3d" }
//   );

//   return { email: user[0].email, token };
// };

// const updateUser = async (id, userData) => {
//   const {
//     name,
//     email,
//     password,
//     phone,
//     isAdmin,
//     landmark,
//     flatnumber,
//     pincode,
//     city,
//     state,
//   } = userData;
//   const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
//   const isAdminInt = isAdmin ? 1 : 0;

//   return await executeQuery(
//     `UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, isAdmin = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?`,
//     [
//       name,
//       email,
//       hashedPassword,
//       phone,
//       isAdminInt,
//       landmark,
//       flatnumber,
//       pincode,
//       city,
//       state,
//       id,
//     ]
//   );
// };

// const deleteUser = async (id) => {
//   return await executeQuery("DELETE FROM users WHERE id = ?", [id]);
// };

// const getUserCount = async () => {
//   return await executeQuery("SELECT COUNT(*) AS userCount FROM users");
// };

// module.exports = {
//   getAllUsers,
//   getUserById,
//   registerUser,
//   loginUser,
//   updateUser,
//   deleteUser,
//   getUserCount,
// };
