import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AddressLink from "../../components/AddressLink";
import AccountNav from '../../components/navbars/AccountNav';
import PlaceImg from '../../components/PlaceImg';
import BookingDates from '../../components/BookingDates';
import { AuthContext } from '../../context/AuthContext';
import HotelGallery from '../../components/HotelGallery';
import { FaBed, FaUsers, FaClipboardList, FaRegClock } from 'react-icons/fa'; // Importing modern icons
import { BsDoorOpenFill } from "react-icons/bs";


import { API_URL } from "../../Config";
const MyBookingDetail = () => {
  const { id } = useParams(); // Get booking ID from URL params
  const { user } = useContext(AuthContext); // Get user from context
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/api/bookings/${id}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        .then((response) => {
          setBooking(response.data);
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error);
        });
    }
  }, [id]);

  if (!booking) {
    return (
      <div>
        
        <div className="text-center mt-8 text-gray-600">Loading booking details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div classname="container max-w-4xl mx-auto  px-4">
<AccountNav />
      </div>
      <div className="mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hotel Image */}
        <div className="w-full">
          <PlaceImg place={booking.hotelId} className="w-full h-80 object-cover rounded-t-xl" />
        </div>
        
        {/* Booking Details */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{booking.hotelId.name}</h2>
          <AddressLink className="my-2 block">{booking.hotelId.address}</AddressLink>
          <BookingDates booking={booking} className="text-gray-500 mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaUsers className="text-primary" />
              <p><strong>User:</strong> {booking.userId.name} ({booking.userId.email})</p>
            </div>

            {/* Room Type */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaBed className="text-primary" />
              <p><strong>Room Type:</strong> {booking.roomType}</p>
            </div>

            {/* Special Requests */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaClipboardList className="text-primary" />
              <p><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</p>
            </div>
            
            {/* Number of Rooms */}
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <BsDoorOpenFill className="text-primary" />
              <p><strong>Number of Rooms:</strong> {booking.numberOfRooms}</p>
            </div>

           
            
          </div>

          {/* Booking Date */}
          <div className="mt-6 flex items-center gap-3 text-lg text-gray-700">
            <FaRegClock className="text-primary" />
            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          </div>

          {/* Price and Total Price */}
          <div className="flex items-center gap-3 mt-6 text-2xl font-semibold text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <span>Total Price: ₹{booking.totalPrice}</span>
          </div>

          {/* Hotel Gallery */}
          <div className="mt-8">
            <HotelGallery hotel={booking.hotelId} />
          </div>

          {/* Back to Bookings Link */}
          <Link
            to="/account/bookings"
            className="mt-6 inline-block text-blue-600 font-medium hover:underline hover:text-blue-800 transition-colors"
          >
            ← Back to Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetail;
