const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, isAdmin } = req.body;

    // Validate input fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    

    
// res.cookie("auth_token", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", // Secure only in production (HTTPS)
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Use "None" only in production
//   maxAge: 60 * 60 * 1000, // 1 hour
// });

res.cookie("auth_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ Secure cookies only in production
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ "None" required for cross-origin cookies
  maxAge: 60 * 60 * 1000, // ✅ 1 hour
});



  
      // Send response
      res.status(200).json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
    
    
      
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  
};

exports.getUserDetails = async (req, res) => {
  console.log("Cookies received in request:", req.cookies);

  try {
      if (!req.cookies.auth_token) {
          return res.status(401).json({ error: "Unauthorized, no token found" });
      }

      const decoded = jwt.verify(req.cookies.auth_token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch user details." });
  }
};




  exports.logout = (req, res) => {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logout successful" });
  };
  