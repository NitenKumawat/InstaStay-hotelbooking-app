const express = require("express");
const { verifyTokenAndFetchUser } = require("../middleware/authMiddleware"); // Middleware to verify user token and fetch user
const {
  createHotel,
  getUserPlaces,  // For admin only to get user's places
  getAllHotels,
  getHotelById,
  updateHotel,

} = require("../controllers/hotelController"); // Importing hotel controller functions

const router = express.Router();

// Routes for hotel management

// Create a new hotel (Admin only)
router.post("/", verifyTokenAndFetchUser, createHotel);

// Get all hotels (Public)
router.get("/", getAllHotels);
router.get("/user-places" ,verifyTokenAndFetchUser,getUserPlaces);

// Get hotel by ID (Public)
router.get("/:id", getHotelById);

// Update hotel by ID (Admin or Owner only)
router.put("/:id", verifyTokenAndFetchUser, updateHotel);



module.exports = router;
