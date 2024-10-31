const {
  registerUser,
  login,
  getCurrentUser,
  getAllUsers,
  checkEmailTaken,
  checkUsernameTaken,
} = require("./userController.js");
const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/", protect, getCurrentUser);
router.get("/all", getAllUsers);
router.post("/exist/email", checkEmailTaken);
router.post("/exist/username", checkUsernameTaken);

module.exports = router;
