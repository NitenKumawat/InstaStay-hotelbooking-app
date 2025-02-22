import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import { API_URL } from "../../Config";
export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        formData
      );
      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl font-semibold text-center m-4">Sign Up</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full mb-2"
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="h-4 w-4 mr-2 appearance-none border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 focus:outline-none "

            />
            <label htmlFor="isAdmin" className="text-gray-700">
              Sign up as Admin
            </label>
          </div>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-full"
          >
            Sign Up
          </button>
          <div className="text-center py-2 text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-600 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
