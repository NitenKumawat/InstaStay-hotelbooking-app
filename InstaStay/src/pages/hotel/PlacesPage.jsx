import React, { useEffect, useState, useContext } from 'react';
import PlaceImg from '../../components/PlaceImg';
import { Link, useNavigate } from 'react-router-dom';
import AccountNav from '../../components/navbars/AccountNav';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaPlus } from 'react-icons/fa'; // Modern icon for Add New Hotel

const PlacesPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/hotels/user-places', {
          withCredentials: true, // Include credentials (cookies)
        });
        console.log(data);
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to fetch places. Please try again.");
      }
    };
    fetchPlaces();
  }, []);

  const handelAddHotel = () => {
    navigate('/account/places/new');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AccountNav />
      
      {/* Add New Hotel Button */}
      <div className="text-center ">
        <button
          onClick={handelAddHotel}
          className="mt-6 inline-flex items-center gap-2 text-lg font-semibold hover:bg-primary-dark  mb-6 py-2 px-6 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          <FaPlus className="w-5 h-5" />
          Add New Hotel
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {/* Places List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1  gap-8 px-4">
        {places.length > 0 ? (
          places.map(place => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className="flex flex-col bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <PlaceImg place={place} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">{place.name}</h2>
                <p className="text-sm text-gray-500 mt-2">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No places found. Add a new hotel!</p>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
