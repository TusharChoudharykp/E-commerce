const express = require("express");
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserCount,
} = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);
router.get("/get/count", authenticateJWT, getUserCount);

module.exports = router;

// const express = require("express");
// const {
//   getAllUsers,
//   getUserById,
//   registerUser,
//   loginUser,
//   updateUser,
//   deleteUser,
//   getUserCount,
// } = require("../controllers/userController");

// const router = express.Router();

// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.get("/get/count", getUserCount);

// module.exports = router;
