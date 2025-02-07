const { differenceInCalendarDays } = require('date-fns'); 
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

exports.createBooking = async (req, res) => {
  
  try {
    const {
      hotelId,
      checkIn,
      checkOut,
      roomType,
      numberOfRooms,
      numberOfGuests,
      specialRequests,
      phone, // Ensure phone is included
    } = req.body;

    // Simple regex to check for a 10-digit phone number
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number. Please enter a valid 10-digit phone number." });
    }

    if (!hotelId || !checkIn || !checkOut || !roomType || !numberOfRooms) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    if (!["Single", "Double", "Suite"].includes(roomType)) {
      return res.status(400).json({ error: "Invalid room type." });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ error: "Check-out date must be after check-in date." });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ error: "Hotel not found." });

    if (hotel.availableRooms < numberOfRooms) {
      return res.status(400).json({ error: "Not enough rooms available." });
    }

    const numberOfNights = Math.max(0, differenceInCalendarDays(checkOutDate, checkInDate));
    const totalPrice = hotel.pricePerNight * numberOfRooms * numberOfNights;

    const booking = new Booking({
      userId: req.user._id,
      hotelId,
      roomType,
      checkInDate,
      checkOutDate,
      guests: numberOfGuests,
      specialRequests,
      numberOfRooms,
      totalPrice,
      phone,
    });

    await booking.save();

    hotel.availableRooms -= numberOfRooms;
    await hotel.save();

    res.status(201).json({ message: "Booking successful.", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params; // Extract booking ID from params
    const booking = await Booking.findById(id)
      .populate('hotelId', ' name address photos pricePerNight') // Populate hotel details
      .populate('userId', 'name email'); // Populate user details

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email") // Populate user details
      .populate("hotelId", "name photos pricePerNight"); // Populate hotel details
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

// Get bookings for a specific user
exports.getBookingsOfUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you're storing the user ID in the session or JWT token
    
    const bookings = await Booking.find({ userId })
    .populate('hotelId', 'name photos pricePerNight') // Populate hotel details
    .populate('userId', 'name email'); // Populate user details

     

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user." });
    }

    res.status(200).json(bookings); // Return the bookings for the user
  } catch (error) {
    console.error("Error fetching bookings for user:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
}; 