const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomType: {
      type: String,
      required: true,
      enum: ["Single", "Double", "Suite"], // Add more room types if needed
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    specialRequests: { type: String },
    
    numberOfRooms: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
