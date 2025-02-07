const express = require("express");
const {
 
  getAllUsers,
 
  createUser,
  updateUser,
  deleteUser,
  getAllHotels,

  createHotel,
  updateHotel,
  deleteHotel,
  getAllBookings,
  getBookingById,
 
  deleteBooking,
  
} = require("../controllers/adminController");

const { verifyTokenAndFetchUser, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// User routes
router.get("/users", verifyTokenAndFetchUser, verifyAdmin, getAllUsers);

router.post("/users", verifyTokenAndFetchUser, verifyAdmin, createUser);
router.put("/users/:id", verifyTokenAndFetchUser, verifyAdmin, updateUser);
router.delete("/users/:id", verifyTokenAndFetchUser, verifyAdmin, deleteUser);

// Hotel routes
router.get("/hotels", verifyTokenAndFetchUser, verifyAdmin, getAllHotels);

router.post("/hotels", verifyTokenAndFetchUser, verifyAdmin, createHotel);
router.put("/hotels/:id", verifyTokenAndFetchUser, verifyAdmin, updateHotel);
router.delete("/hotels/:id", verifyTokenAndFetchUser, verifyAdmin, deleteHotel);



// Booking routes
router.get("/bookings", verifyTokenAndFetchUser, verifyAdmin, getAllBookings);
router.get("/bookings/:id", verifyTokenAndFetchUser, verifyAdmin, getBookingById);


router.delete("/bookings/:id", verifyTokenAndFetchUser, verifyAdmin, deleteBooking);






module.exports = router;
