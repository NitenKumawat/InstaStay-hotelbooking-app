import React, { useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext'; // Use the context hook
import { Link } from 'react-router-dom';

import Image from '../components/Image'; // Assuming this is your image wrapper component

const HomePage = () => {
  const { searchTerm } = useSearch(); // Get searchTerm from context
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Fetch hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels');
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data); // Initialize filteredHotels with all hotels
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  // Filter hotels based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = hotels.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.pricePerNight.toString().includes(searchTerm) // Adding price filtering
        );
      });
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels); // Reset to all hotels when search term is cleared
    }
  }, [searchTerm, hotels]);

  return (

    <div className=" container mx-auto  px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Welcome to InstaStay</h1>
      <h2 className="text-2xl font-semibold text-center mb-6">All Hotels</h2>

      {/* Hotels Grid */}
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-transform duration-200">
              <Link to={`/hotel/${hotel._id}`}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {hotel.photos?.[0] && (
                    <Image className="rounded-2xl object-cover aspect-square" src={hotel.photos[0]} alt="Hotel" />
                  )}
                </div>
                <h2 className="font-bold">{hotel.address}</h2>
                <h3 className="text-sm text-gray-500">{hotel.name}</h3>
                <h2 className="text-xl font-bold text-blue-600">{hotel.name}</h2>
                <div className="mt-1">
                  <span className="font-bold">₹{hotel.pricePerNight}</span> per night
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No hotels match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
