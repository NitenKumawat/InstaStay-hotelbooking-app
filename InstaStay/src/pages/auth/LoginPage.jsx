import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext"; // Import AuthContext for authentication

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    setError(""); // Reset error on each submit
    try {
      // Use the login function from AuthContext
      await login(formData.email, formData.password);
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      if (err.response?.status === 404) {
        // If user not found, redirect to signup
        setError("User not found. Redirecting to signup...");
        setTimeout(() => navigate("/signup"), 2000); // Redirect to signup page after 2 seconds
      } else {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl font-semibold text-center m-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-4"
            required
          />
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <button type="submit" className="w-full bg-rose-600 text-white p-2 rounded-full">
            Login
          </button>
          <div className="text-center py-2 text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-green-600">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
