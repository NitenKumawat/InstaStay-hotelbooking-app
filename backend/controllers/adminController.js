const mongoose = require("mongoose");
const User = require("../models/User");
const HotelModel = require("../models/Hotel");
const Booking = require("../models/Booking");
const bcrypt = require("bcrypt");

// Utility function to validate ObjectID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// User Management
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};



// Admin create a new user
const createUser = async (req, res) => {
  try {
    // Only allow admin to create a user
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const usersData = req.body; // Array or single object of user data

    // Function to validate and create user
    const createUserData = async (user) => {
      const { name, email, password, isAdmin } = user;

      // Validate input fields
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      // Validate password length
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      return {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      };
    };

    if (Array.isArray(usersData)) {
      // Create multiple users
      const usersToCreate = [];
      for (let userData of usersData) {
        try {
          const user = await createUserData(userData);
          usersToCreate.push(user);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      }
      await User.create(usersToCreate);
      res.status(201).json({ message: `${usersToCreate.length} users created successfully!` });
    } else {
      // Create single user
      const user = await createUserData(usersData);
      await User.create(user);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user." });
  }
};


// Admin update a user's details
const updateUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Only allow admin to update a user
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // Validate ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Fetch user to be updated
    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the email already exists and belongs to a different user
    if (email && email !== userToUpdate.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use by another user." });
      }
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }

    // Hash password only if it's being updated
    let hashedPassword = userToUpdate.password; // Keep the existing password
    if (!(password===userToUpdate.password)) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name || userToUpdate.name, // Keep the current name if not provided
        email: email || userToUpdate.email, // Keep the current email if not provided
        password: hashedPassword,
        isAdmin: isAdmin !== undefined ? isAdmin : userToUpdate.isAdmin, // Only update isAdmin if provided
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};



const deleteUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};



// Hotel Management
const getAllHotels = async (req, res) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
};



const createHotel = async (req, res) => {
  try {
    // Check if the body contains an array of hotels
    const hotels = Array.isArray(req.body) ? req.body : [req.body];  // Wrap single hotel object in an array

    // Create hotels (whether one or multiple)
    const savedHotels = await HotelModel.create(
      hotels.map((hotel) => ({
        name: hotel.name,
        address: hotel.address,
        photos: hotel.photos,
        description: hotel.description,
        amenities: hotel.amenities,
        extraInfo: hotel.extraInfo,
        checkIn: hotel.checkIn,
        checkOut: hotel.checkOut,
        maxGuests: hotel.maxGuests,
        pricePerNight: hotel.pricePerNight,
        totalRooms: hotel.totalRooms,
        availableRooms: hotel.availableRooms,
        owner: req.user._id, // Assuming owner is derived from authentication middleware
      }))
    );

    res.status(201).json(savedHotels);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Failed to create hotel." });
  }
};


const updateHotel = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid hotel ID." });
    }
    const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) return res.status(404).json({ error: "Hotel not found." });
    res.status(200).json(updatedHotel);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: "Failed to update hotel." });
  }
};

const deleteHotel = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid hotel ID." });
    }
    const deletedHotel = await HotelModel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ error: "Hotel not found." });
    res.status(200).json({ message: "Hotel deleted successfully." });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ error: "Failed to delete hotel." });
  }
};

// Booking Management
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings with user and hotel details
    const bookings = await Booking.find()
      .populate("userId") // Fetch user details
      .populate("hotelId"); // Fetch hotel details

    // Filter and delete bookings with null userId
    const validBookings = [];
    for (const booking of bookings) {
      if (!booking.userId) {
        // If userId is null, delete the booking
        await Booking.findByIdAndDelete(booking._id);
        console.log(`Deleted orphaned booking with ID: ${booking._id}`);
      } else {
        validBookings.push(booking);
      }
    }

    res.status(200).json(validBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};




const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId").populate("hotelId");
    if (!booking) return res.status(404).json({ error: "Booking not found." });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking." });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: "Booking not found." });
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking." });
  }
};

// Export all handlers
module.exports = {
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
};
