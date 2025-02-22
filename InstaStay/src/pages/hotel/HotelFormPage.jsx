import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PhotosUploader from "../../components/PhotosUploader.jsx";
import Perks from "../../components/Perks.jsx";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../../components/navbars/AccountNav.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";


import { API_URL } from "../../Config";
export default function HotelFormPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Get user from context
  
  const [formData, setFormData] = useState({
    owner: user?._id || '', // Get the logged-in user's ID
    name: '',
    address: '',
    photos: [],
    description: '',
    amenities: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 1,
    pricePerNight: 100,
    totalRooms: 1,
    availableRooms: 1,
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/hotels/${id}`, {
          withCredentials: true, // Include credentials
        });
        setFormData(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotosChange = (photos) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: photos,
    }));
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: selectedAmenities,
    }));
  };

  const saveHotel = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing hotel
        await axios.put(`${API_URL}/api/hotels/${id}`, formData, {
          withCredentials: true, // Include credentials
        });
      } else {
        // Create new hotel
        await axios.post(`${API_URL}/api/hotels`, formData, {
          withCredentials: true, // Include credentials
        });
      }

      setRedirect(true);
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <>
      <AccountNav />
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={saveHotel} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Hotel Details</h2>

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <div className="space-y-2">
            <label className="block text-gray-600">Photos</label>
            <PhotosUploader addedPhotos={formData.photos} onChange={handlePhotosChange} />
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
            <label className="block text-gray-600">Amenities</label>
            <Perks selected={formData.amenities} onChange={handleAmenitiesChange} />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-600">Extra Info</label>
            <textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Additional Info"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

          <button className="w-full  focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 py-3 px-6 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300">
            {id?"Update Hotel":"Create Hotel"}
          </button>
        </form>
      </div>
    </>
  );
}
