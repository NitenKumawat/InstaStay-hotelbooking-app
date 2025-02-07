import React from 'react'
import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../../components/BookingWidget";
import HotelGallery from "../../components/HotelGallery";
import AddressLink from "../../components/AddressLink";
const HotelPage = () => {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get(`http://localhost:5000/api/hotels/${id}`).then(response => {
          setHotel(response.data);
        });
      }, [id]);
    
      if (!hotel) return '';
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-16 pt-8">
      <h1 className="text-3xl">{hotel.title}</h1>
      <AddressLink>{hotel.address}</AddressLink>

      <HotelGallery hotel={hotel} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {hotel.description}
          </div>
          Check-in: {hotel.checkIn}<br />
          Check-out: {hotel.checkOut}<br />
          Max number of guests: {hotel.maxGuests}
        </div>
        <div>
          <BookingWidget hotel={hotel} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{hotel.extraInfo}</div>
      </div>
    </div>
  )
}

export default HotelPage

