import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlaceImg from '../../components/PlaceImg';
import AdminDashboard from '../../components/navbars/AdminDashboard';

import { API_URL } from "../../Config";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/bookings`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setBookings(response.data);
        setFilteredBookings(response.data); // Initially show all bookings
      } catch (error) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredBookings(bookings); // Show all bookings if search is cleared
    } else {
      const filtered = bookings.filter((booking) => {
        return (
          booking.hotelId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userId.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/bookings/${id}`, {
        withCredentials: true,
      });
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      setFilteredBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      setError('Failed to delete booking');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <AdminDashboard/>
      <div className="container max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Bookings</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-[1.05] transition-transform duration-500"
              >
                {/* Hotel Image */}
                <div className="w-full h-48">
                  <PlaceImg
                    place={booking.hotelId}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{booking.hotelId.name}</h3>
                  <p className="text-gray-600 text-sm truncate">{booking.userId.name} ({booking.userId.email})</p>
                  <p className="text-sm text-gray-500">Booked On: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">₹{booking.totalPrice}</p>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <Link
                    to={`/admin/bookings/${booking._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-16">
            <p className="text-xl">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
