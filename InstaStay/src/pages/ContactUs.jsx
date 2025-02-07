import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Have questions or need help? Reach out to us, and we'll get back to
          you as soon as possible.
        </p>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                rows="4"
                placeholder="Write your message"
              ></textarea>
            </div>
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Additional Contact Information */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h2>
          <p className="text-gray-600">
           9, kd place , jobner, Jaipur(Raj.)
          </p>
          <p className="text-gray-600">Email: support@instastay.com</p>
          <p className="text-gray-600">Phone: 91 8058008642</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
