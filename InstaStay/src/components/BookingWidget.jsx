import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function BookingWidget({ hotel }) {
  const { user } = useContext(AuthContext); // Get user from context
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    roomType: 'Single',
    numberOfRooms: 1,
    specialRequests: '',
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  // Calculate the number of nights
  const numberOfNights =
    formData.checkIn && formData.checkOut
      ? differenceInCalendarDays(new Date(formData.checkOut), new Date(formData.checkIn))
      : 0;

  // Handle form change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Booking function
  async function bookThisPlace() {
    if (!user) {
      alert("Please log in to book this place.");
      setRedirect('/login'); // Redirect to login if not logged in
      return;
    }
  
    if (!formData.checkIn || !formData.checkOut || numberOfNights <= 0) {
      setError("Invalid check-in or check-out dates.");
      return;
    }
  
    try {
      const totalPrice = numberOfNights * hotel.pricePerNight * formData.numberOfRooms;
  
      const response = await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        hotelId: hotel._id,
        totalPrice,
      }, {
        withCredentials: true // Ensure cookies are sent with the request
      });
  
      const bookingId = response.data.booking._id; // Assuming backend returns `booking` with `_id`
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to create booking. Please try again.";
      setError(errorMessage);
    }
  }
  

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        ₹{hotel.pricePerNight} <span className="text-gray-500">/ per night</span>
      </h2>
      <form className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Check in:</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check out:</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            min="1"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Room type:</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of rooms:</label>
          <input
            type="number"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleInputChange}
            min="1"
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Special requests:</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {numberOfNights > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Your full name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">Phone number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </form>
      <button
        onClick={bookThisPlace}
        className="w-full    mt-6 text-sm font-medium  mb-6 py-3 px-6 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
      >
        Book this place
        {numberOfNights > 0 && (
          <span className="ml-2">₹{numberOfNights * hotel.pricePerNight * formData.numberOfRooms}</span>
        )}
      </button>
    </div>
  );
}
