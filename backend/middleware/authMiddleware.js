const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyTokenAndFetchUser = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // ✅ Log cookies

    const token = req.cookies.auth_token;
    if (!token) {
      console.log("❌ No token found in cookies.");
      return res.status(401).json({ error: "Unauthorized! Please log in." });
    }

    console.log("🔹 Token found:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("❌ User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    console.log("✅ User authenticated:", user.email);
    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Token verification error:", error.message);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};


// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyTokenAndFetchUser, verifyAdmin };
