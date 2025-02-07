import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../../components/navbars/AccountNav";
import PlacesPage from "../hotel/PlacesPage"; // Assuming you have a component for places

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, logout, loading } = useContext(AuthContext);
  let { subpage } = useParams(); // Extract 'subpage' from the route parameters

  if (!subpage) {
    subpage = "profile"; // Default to 'profile' if no subpage is provided
  }

  const handleLogout = async () => {
    await logout();
    setRedirect("/login"); // Redirect to login after logout
  };

  if (loading) {
    return "Loading..."; // Show loading while user data is being fetched
  }

  if (!user && !redirect) {
    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <p className=" font-semibold m-8">
            Logged in as {user.name} ({user.email})
          </p>

          <button onClick={handleLogout} className="bg-red-600 rounded-full text-white p-2 max-w-sm  w-32" >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
