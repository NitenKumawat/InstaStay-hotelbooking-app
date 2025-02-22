const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
require('./config/db');

const app = express();
// Load environment variables from .env file
dotenv.config();



app.use(
  cors({
    origin: ["http://localhost:5173", "https://insta-stay-hotelbooking-app.vercel.app"], // ✅ Allow local & Vercel frontend
    credentials: true, // ✅ Allow sending cookies
  })
);

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cookieParser()); // To read cookies sent by the client




// Import routes
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);




// Handle default route
app.get("/", (req, res) => {
    res.send("Hotel Booking API - Auth Service");
  });
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Ensure 'uploads' directory exists
if (!fs.existsSync(path.join(__dirname, '/uploads'))) {
  fs.mkdirSync(path.join(__dirname, '/uploads'));
}

// Upload an image via a link
app.post('/api/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      return res.status(400).json({ error: "Link is required" });
    }
    const newName = 'photo' + Date.now() + '.jpg';
    const destPath = path.join(__dirname, '/uploads', newName);

    await imageDownloader.image({
      url: link,
      dest: destPath,
    });

    res.json(newName); // Return the filename
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

// File uploads
const upload = multer({ dest: 'uploads/' });
app.post('/api/upload', upload.array('photos', 50), async (req, res) => {
  try {
    const uploadedFiles = [];
    for (const file of req.files) {
      const { path: tempPath, originalname } = file;
      const ext = path.extname(originalname);
      const newPath = `${tempPath}${ext}`;
      fs.renameSync(tempPath, newPath); // Rename file with extension
      uploadedFiles.push(path.basename(newPath)); // Return only the filename
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: "Failed to upload files" });
  }
});


  // Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});