const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true // Hotel owner reference
  },
  name: {
    type: String,
    required: true, // Hotel name
  },
  address: {
    type: String,
    required: true, // Hotel address
  },
  photos: {
    type: [String], // List of photo URLs
    default: [],
  },
  description: {
    type: String,
    required: true, // Detailed description
  },
  amenities: {
    type: [String], // List of amenities (e.g., "Wi-Fi", "Pool")
    default: [],
  },
  extraInfo: {
    type: String, // Additional information about the hotel
    default: "",
  },
  checkIn: {
    type: Number, // Check-in time in 24-hour format (e.g., 14 for 2:00 PM)
    required: true,
  },
  checkOut: {
    type: Number, // Check-out time in 24-hour format (e.g., 11 for 11:00 AM)
    required: true,
  },
  maxGuests: {
    type: Number, // Maximum number of guests
    required: true,
  },
  pricePerNight: {
    type: Number, // Price per night
    required: true,
  },
  totalRooms: {
    type: Number, // Total number of rooms in the hotel
    required: true,
  },
  availableRooms: {
    type: Number, // Available rooms for booking
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const HotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = HotelModel;
