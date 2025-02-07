const express = require("express");
const { verifyTokenAndFetchUser } = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookingById,
  getAllBookings,
  getBookingsOfUser,
} = require("../controllers/bookingController");

const router = express.Router();

// Create a new booking
router.post("/", verifyTokenAndFetchUser, createBooking);

// Get bookings for a specific user
router.get("/user-bookings", verifyTokenAndFetchUser, getBookingsOfUser);
router.get('/:id',verifyTokenAndFetchUser, getBookingById);

// Get all bookings (Admin only)
router.get("/", verifyTokenAndFetchUser, getAllBookings);



module.exports = router;
