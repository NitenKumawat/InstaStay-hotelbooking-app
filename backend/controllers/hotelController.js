const Hotel = require("../models/Hotel");

// Create a new hotel
exports.createHotel = async (req, res) => {
  try {
    console.log("Creating new hotel:", req.body); // Debugging
    const { name, address, description, photos, amenities, extraInfo, checkIn, checkOut, maxGuests, pricePerNight, totalRooms } = req.body;

    // Check if all required fields are provided
    if (!name || !address || !description || !pricePerNight || !totalRooms || !checkIn || !checkOut || !maxGuests) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Check if the user is an admin
    if (!req.user) {
      return res.status(403).json({ error: "Access denied! Admins only." });
    }

    // Create the hotel
    const newHotel = new Hotel({
      owner: req.user._id,
      name,
      address,
      description,
      photos: photos || [],
      amenities: amenities || [],
      extraInfo: extraInfo || "",
      checkIn,
      checkOut,
      maxGuests,
      pricePerNight,
      totalRooms,
      availableRooms: totalRooms, // Set available rooms equal to total rooms initially
    });

    const savedHotel = await newHotel.save();

    res.status(201).json({
      message: "Hotel created successfully!",
      hotel: savedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get users all hotels
exports.getUserPlaces = async (req, res) => {
  try {
  
    if (!req.user) {
      return res.status(403).json({ error: "Access denied! Users only." });
    }
    const hotels = await Hotel.find({ owner: req.user._id });
    
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
};
// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner", "name email"); // Populate owner details
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found." });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
};

// Update hotel by ID
exports.updateHotel = async (req, res) => {
  try {
    const { name, address, description, photos, amenities, extraInfo, checkIn, checkOut, maxGuests, pricePerNight, totalRooms } = req.body;
    console.log("updating  user's hotels:"); // Debugging
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found." });
    }

    // Only the owner or an admin can update the hotel
    if (hotel.owner.toString() !== req.user._id.toString() && !req.user) {
      return res.status(403).json({ error: "Access denied! Only the owner " });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name, address, description, photos, amenities, extraInfo, checkIn, checkOut, maxGuests, pricePerNight, totalRooms },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hotel." });
  }
};


