import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white mt-4 py-8 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start gap-2">
  {/* Logo and Name in a Line */}
  <div className="flex items-center gap-2">
    <img
      src="/InstaStayLogo.png"
      className="h-10 w-10 object-contain"
      alt="InstaStay Logo"
    />
    <h1 className="text-3xl font-bold text-primary">InstaStay</h1>
  </div>
  
  {/* Description Below */}
  <p className="text-sm text-gray-400">
    Your trusted platform for booking stays in the best hotels worldwide.
  </p>
</div>



          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/aboutus" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">Stay updated with our latest offers and news!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg text-black focus:outline-none w-2/3"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} InstaStay. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
