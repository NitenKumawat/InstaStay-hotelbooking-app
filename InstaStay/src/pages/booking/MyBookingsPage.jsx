import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../../components/navbars/AccountNav';
import PlaceImg from '../../components/PlaceImg';
import BookingDates from '../../components/BookingDates';
import { format } from 'date-fns';

import { API_URL } from "../../Config";
const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings/user-bookings/`, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all bookings details:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AccountNav />
      <div className="container max-w-4xl  mx-auto mt-14 px-4">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-[1.03] transition-transform duration-300"
                style={{ height: '350px' }} // Fixed card height
              >
                {/* Image Section */}
                <div className="w-full h-48">
                  <PlaceImg
                    place={booking.hotelId}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {booking.hotelId.name}
                    </h2>
                    <BookingDates
                      booking={booking}
                      className="text-sm text-gray-500 mt-1"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-sm font-semibold">
                        ₹{booking.totalPrice}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 italic">
                      Updated: {format(new Date(booking.updatedAt), 'dd MMM yyyy')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-16">
            <p className="text-xl">No bookings found.</p>
            <p className="mt-2 text-sm">You haven’t made any bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
