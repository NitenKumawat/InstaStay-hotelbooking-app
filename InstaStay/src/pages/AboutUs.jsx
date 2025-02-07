import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our hotel booking platform, where comfort meets convenience.
          We’re dedicated to helping you find the perfect stay for your journey.
        </p>

        {/* About Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div>
            <img
              src="https://www.visa.gd/dam/VCOM/regional/lac/SPA/Default/affluent/VHLC/marquee-visa-luxury-hotel-collection-1600x900.jpg"
              alt="Luxury Hotel"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission is to make your stay as memorable as possible. We work
              with thousands of hotels worldwide to offer you the best deals
              across luxury, budget, and boutique accommodations. Whether
              you're traveling for business or leisure, we’ve got you covered.
            </p>
            <ul className="list-disc list-inside text-left text-gray-600">
              <li>Wide range of hotels to suit every budget.</li>
              <li>Seamless booking experience with user-friendly tools.</li>
              <li>24/7 customer support to ensure your satisfaction.</li>
              <li>Exclusive deals and discounts for loyal customers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          What Our Guests Say
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">
              “I found the perfect hotel for my trip within minutes. The booking
              process was so easy, and the customer service was exceptional.”
            </p>
            <h3 className="text-gray-800 font-semibold mt-4">- Niten kumawat</h3>
          </div>
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">
              “This platform is a game changer. Great deals, smooth experience,
              and excellent support!”
            </p>
            <h3 className="text-gray-800 font-semibold mt-4">- Gajanand</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
