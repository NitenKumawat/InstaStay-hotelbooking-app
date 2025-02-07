import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import PlaceImg from "../../components/PlaceImg";
import PhotosUploader from "../../components/PhotosUploader";
import Perks from "../../components/Perks";
import AdminDashboard from "../../components/navbars/AdminDashboard";

const HotelsPage = () => {
  const { user } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    photos: [],
    description: "",
    amenities: [],
    extraInfo: "",
    checkIn: 14,
    checkOut: 11,
    maxGuests: 1,
    pricePerNight: 0,
    totalRooms: 1,
    availableRooms: 1,
  });
  const [editHotel, setEditHotel] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/hotels", {
          withCredentials: true,
        });
        setHotels(response.data);
      } catch (err) {
        setError("Failed to fetch hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [user]);

  const handleCreateHotel = () => {
    setEditHotel(null);
    setIsFormVisible(true);
  };

  const handleSaveHotel = () => {
    setIsFormVisible(false);
    setEditHotel(null);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditHotel(null);
  };

  const handleCreateHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/hotels",
        formData,
        { withCredentials: true }
      );
      setHotels((prevHotels) => [...prevHotels, response.data]);
      setFormData({
        name: "",
        address: "",
        photos: [],
        description: "",
        amenities: [],
        extraInfo: "",
        checkIn: 14,
        checkOut: 11,
        maxGuests: 1,
        pricePerNight: 0,
        totalRooms: 1,
        availableRooms: 1,
      });
      handleSaveHotel();
    } catch (err) {
      setError("Failed to create hotel.");
    }
  };

  const handleEditHotel = (hotelToEdit) => {
    setEditHotel(hotelToEdit);
    setFormData(hotelToEdit);
    setIsFormVisible(true);
  };

  const handleUpdateHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/hotels/${editHotel._id}`,
        formData,
        { withCredentials: true }
      );
      setHotels((prevHotels) =>
        prevHotels.map((hotel) =>
          hotel._id === editHotel._id ? { ...hotel, ...formData } : hotel
        )
      );
      handleSaveHotel();
    } catch (err) {
      setError("Failed to update hotel.");
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/hotels/${id}`, {
        withCredentials: true,
      });
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
    } catch (err) {
      setError("Failed to delete hotel.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotosChange = (photos) => {
    console.log("Updated photos:", photos); // Debugging step
    setFormData((prev) => ({
      ...prev,
      photos,
    }));
  };
  

  const handleAmenitiesChange = (amenities) => {
    setFormData({
      ...formData,
      amenities,
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (e) => {
    if (e.target.name === "minPrice") setMinPrice(e.target.value);
    if (e.target.name === "maxPrice") setMaxPrice(e.target.value);
  };

  const handleAmenitiesFilter = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = hotel.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = hotel.pricePerNight >= (minPrice || 0) && hotel.pricePerNight <= (maxPrice || Infinity);
    const matchesAmenities = selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));

    return matchesName && matchesPrice && matchesAmenities;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-7xl mx-auto ">
      <AdminDashboard/>
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Hotels</h1>

      {/* Centered Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search hotels by name"
          className="border p-3 w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Price Range Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        <input
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={handlePriceChange}
          placeholder="Min Price"
          className="border p-3 w-full md:w-1/4 lg:w-1/5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="maxPrice"
          value={maxPrice}
          onChange={handlePriceChange}
          placeholder="Max Price"
          className="border p-3 w-full md:w-1/4 lg:w-1/5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Amenities Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Free WiFi", "Pool", "Parking", "Restaurant"].map((amenity) => (
          <button
            key={amenity}
            onClick={() => handleAmenitiesFilter(amenity)}
            className={`p-3 rounded-full border ${selectedAmenities.includes(amenity) ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"}`}
          >
            {amenity}
          </button>
        ))}
      </div>

      {/* Create New Hotel Button */}
      {!isFormVisible && (
        <button
          onClick={handleCreateHotel}
          className="mb-6 py-3 px-6 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Create New Hotel
        </button>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Hotel Creation and Edit Form */}
      {isFormVisible && (
        <form onSubmit={editHotel ? handleUpdateHotel : handleCreateHotelSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700">{editHotel ? "Edit" : "Create"} Hotel</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Hotel Name"
              />
            </div>

            <div>
              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Hotel Address"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Photos</label>
            <PhotosUploader addedPhotos={formData.photos} onChange={handlePhotosChange} />
          </div>

          <div>
            <label className="block text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Hotel Description"
            />
          </div>

          <div>
            <label className="block text-gray-600">Amenities</label>
            <Perks selected={formData.amenities} onChange={handleAmenitiesChange} />
          </div>

          <div>
            <label className="block text-gray-600">Extra Info</label>
            <textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Additional Info"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600">Check-In Time (24-hour format)</label>
              <input
                type="number"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Check-in Time"
              />
            </div>

            <div>
              <label className="block text-gray-600">Check-Out Time (24-hour format)</label>
              <input
                type="number"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Check-out Time"
              />
            </div>

            <div>
              <label className="block text-gray-600">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Max Guests"
              />
            </div>

            <div>
              <label className="block text-gray-600">Price per Night</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Price per Night"
              />
            </div>

            <div>
              <label className="block text-gray-600">Total Rooms</label>
              <input
                type="number"
                name="totalRooms"
                value={formData.totalRooms}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Total Rooms"
              />
            </div>

            <div>
              <label className="block text-gray-600">Available Rooms</label>
              <input
                type="number"
                name="availableRooms"
                value={formData.availableRooms}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Available Rooms"
              />
            </div>
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {editHotel ? "Update Hotel" : "Save Hotel"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Hotel List */}
      {!isFormVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <div
            key={hotel._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md  flex flex-col h-full overflow-hidden transform hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="relative w-full h-48">
              {hotel.photos.length > 0 && (
                <PlaceImg place={hotel} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-semibold text-indigo-600">{hotel.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{hotel.address}</p>
          
              <div className="mt-4 flex flex-col justify-between flex-grow">
                <p className="text-sm text-gray-700">
                  <strong>Amenities:</strong> {hotel.amenities.join(", ")}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Price:</strong> ${hotel.pricePerNight} / night
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Available Rooms:</strong> {hotel.availableRooms}
                </p>
              </div>
            </div>
          
            {/* Buttons at the bottom */}
            <div className="flex justify-between items-center p-4 mt-auto border-t border-gray-200">
              <button
                onClick={() => handleEditHotel(hotel)}
                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteHotel(hotel._id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
          
           
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default HotelsPage;
