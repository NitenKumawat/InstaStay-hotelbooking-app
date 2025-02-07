import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaUsers, FaClipboardList, FaRegClock } from 'react-icons/fa';
import { BsDoorOpenFill } from "react-icons/bs";
import PlaceImg from '../../components/PlaceImg';

import HotelGallery from '../../components/HotelGallery';

const BookingDetailPage = () => {
  const { id } = useParams(); // Get booking ID from URL params
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/admin/bookings/${id}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        .then((response) => {
          setBooking(response.data);
        })
        .catch((error) => {
          setError('Failed to fetch booking details');
        });
    }
  }, [id]);

  if (!booking) {
    return (
      <div className="text-center mt-8 text-gray-600">
        {error || 'Loading booking details...'}
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-100 p-8">
      <div className="container max-w-4xl mx-auto mt-5 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">{booking.hotelId.name} Booking Details</h1>
        <PlaceImg place={booking.hotelId} className="w-full h-80 object-cover rounded-t-xl" />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaUsers className="text-primary" />
              <p><strong>User:</strong> {booking.userId.name} ({booking.userId.email})</p>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaBed className="text-primary" />
              <p><strong>Room Type:</strong> {booking.roomType}</p>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaClipboardList className="text-primary" />
              <p><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</p>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <BsDoorOpenFill className="text-primary" />
              <p><strong>Number of Rooms:</strong> {booking.numberOfRooms}</p>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaRegClock className="text-primary" />
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6 text-2xl font-semibold text-gray-800">
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
          </div>
          
          {/* Hotel Gallery */}
          <HotelGallery hotel={booking.hotelId} />
          
          {/* Back to Bookings Link */}
          <Link to="/admin/bookings" className="mt-6 inline-block text-blue-600 font-medium hover:underline">
            ← Back to Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
