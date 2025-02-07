const express = require("express");
const { register, login, getUserDetails, logout } = require("../controllers/authController");
const { verifyTokenAndFetchUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Signup route
router.post("/signup", register);

// Login route
router.post("/login", login);

// Get user details route (requires authentication)
router.get("/me", verifyTokenAndFetchUser, getUserDetails);

// Logout route
router.post("/logout", logout);

module.exports = router;
