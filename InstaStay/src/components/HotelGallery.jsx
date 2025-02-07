import { useState } from "react";
import Image from "./Image.jsx";

export default function HotelGallery({ hotel }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen overflow-auto">
        <div className="bg-black p-8 grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl">Photos of {hotel.name}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex mr-10 gap-1  px-4  shadow-black  text-white fixed top-4 right-4 z-50 opacity-100 border-2 border-white py-3 bg-gray-600  rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {hotel?.photos?.length > 0 &&
            hotel.photos.map((photo, index) => (
              <div key={index}>
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {hotel.photos?.[0] && (
            <div>
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full object-cover cursor-pointer"
                src={hotel.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2">
          {hotel.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={hotel.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {hotel.photos?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full object-cover cursor-pointer"
                src={hotel.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
