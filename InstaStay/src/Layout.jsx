import React from 'react';
import Navbar from './components/navbars/Navbar';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext'; // Import the SearchProvider

const Layout = () => {
  return (
    <SearchProvider> {/* Wrap the app with SearchProvider */}
    <div className="flex flex-col min-h-screen"> {/* Ensure proper layout */}
      {/* Navbar always at the top */}
      <Navbar />
      {/* Content below the navbar */}
      <div className="mt-[64px] flex-grow"> {/* Adjust margin to avoid overlap */}
        <Outlet />
      </div>
    </div>
  </SearchProvider>
  );
};

export default Layout;
