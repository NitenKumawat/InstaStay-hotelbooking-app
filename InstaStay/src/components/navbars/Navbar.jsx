import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext"; // Use the context hook


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useSearch(); // Destructure searchTerm and setSearchTerm from context

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update search term in context
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate("/"); // Or wherever you want to navigate to after search
    }
  };

  const [menuOpen, setMenuOpen] = useState(false); // State for controlling the mobile menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu on small screens
  };

  return (
    <header className="flex justify-between items-center xl:px-20 lg:px-32 py-2 sm:px-10 md:px-5 bg-white shadow-md z-10 fixed w-full top-0 left-0">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
        
        <img className="h-8 w-8" src="/InstaStayLogo.png" alt="" />
        <span className="font-bold text-xl text-primary">InstaStay</span>
      </Link>

      {/* Tabs Section (Desktop) */}
      <div className="hidden lg:flex gap-8 ">
        <Link to="/" className="text-lg text-gray-700 hover:text-primary transition-all duration-300">Home</Link>
        <Link to="/aboutus" className="text-lg text-gray-700 hover:text-primary transition-all duration-300">About</Link>
        <Link to="/contact" className="text-lg text-gray-700 hover:text-primary transition-all duration-300">Contact</Link>
        {user && user.isAdmin && (
          <Link to="/admin" className="text-lg text-gray-700 hover:text-primary transition-all duration-300">Dashboard</Link>
        )}
      </div>

      {/* Search Bar Section */}
      <form onSubmit={handleSearchSubmit} className="mx-2 flex items-center gap-2 border border-gray-300 rounded-full md:pl-10  px-1 shadow-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search hotels"
          className="focus:outline-none w-full sm:w-40 md:w-48 lg:w-72 xl:w-80 sm:h-10 md:h-10  sm:text-sm md:text-base xl:text-lg sm:px-2 md:px-3 xl:px-4"
        />
        <button type="submit" className="bg-primary text-white md:p-2 p-1 m-1 rounded-full sm:text-sm md:text-base xl:text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form>

      {/* Dropdown Menu (Mobile) */}
      <div className={`absolute top-16 left-0 w-full bg-white shadow-md lg:hidden ${menuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-4 py-4 px-4">
          <Link to="/" className="text-lg text-gray-700 hover:text-primary transition-all duration-300" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/aboutus" className="text-lg text-gray-700 hover:text-primary transition-all duration-300" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="text-lg text-gray-700 hover:text-primary transition-all duration-300" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          {user && user.isAdmin && (
            <Link to="/admin" className="text-lg text-gray-700 hover:text-primary transition-all duration-300" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Right Side (User/Account / Dashboard / Login) */}
      <div className="flex items-center gap-2">
        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Account/Login Button */}
        <div className="relative">
          <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full sm:py-2 sm:px-4 p-1 hover:bg-gray-100 transition-all duration-200">
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6 h-4 w-4 relative top-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            {user && <div className="sm:text-sm  text-xs font-semibold text-green-600 ">{user.name} </div>}
            {!user && <div className="sm:text-sm  text-xs  font-semibold text-red-600">Login </div>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
