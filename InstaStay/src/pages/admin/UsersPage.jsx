import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AdminDashboard from "../../components/navbars/AdminDashboard";

import { API_URL } from "../../Config";
const UsersPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch the users when the component mounts or when the `user` context changes
  useEffect(() => {
    if (!user || !user.isAdmin) return;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/users`, {
          withCredentials: true,
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        (user.isAdmin ? "admin" : "user").includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/admin/users`,
        newUser,
        { withCredentials: true }
      );
      // Re-fetch the users after creation
      fetchUsers();
      setNewUser({ name: "", email: "", password: "", isAdmin: false });
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditUser({ ...userToEdit }); // Clone user data to edit
    setNewUser({ ...userToEdit }); // Populate form fields with user data
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // Clone the editUser object to avoid mutating state directly
    const userToUpdate = { ...editUser };

    // If the password field is empty, remove it from the object
    if (!userToUpdate.password) {
      delete userToUpdate.password;
    }

    try {
      await axios.put(
        `${API_URL}/api/admin/users/${editUser._id}`,
        userToUpdate,
        { withCredentials: true }
      );

      // Re-fetch the users after update
      fetchUsers();

      // Reset the form and state after successful update
      setEditUser(null);
      setNewUser({ name: "", email: "", password: "", isAdmin: false });
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        withCredentials: true,
      });

      // Re-fetch the users after deletion
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (editUser) {
      setEditUser({
        ...editUser,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <AdminDashboard />
        <h1 className="text-3xl font-bold text-center mb-6">Manage Users</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or role (Admin/User)"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Create or Edit User Form */}
        <form
          onSubmit={editUser ? handleUpdateUser : handleCreateUser}
          className="mb-8 p-4 border rounded-lg bg-white shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">{editUser ? "Edit User" : "Create New User"}</h2>
          <div>
            <input
              type="text"
              name="name"
              value={editUser ? editUser.name : newUser.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border p-2 w-full mb-4"
            />
            <input
              type="email"
              name="email"
              value={editUser ? editUser.email : newUser.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 w-full mb-4"
            />
            <input
              type="password"
              name="password"
              value={editUser ? editUser.password : newUser.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border p-2 w-full mb-4"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={editUser ? editUser.isAdmin : newUser.isAdmin}
                onChange={handleInputChange}
                className="h-4 w-4 mr-2 appearance-none border-2 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
              />
              <label htmlFor="isAdmin">Admin</label>
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
            >
              {editUser ? "Update User" : "Create User"}
            </button>
          </div>
        </form>

        {/* Users List in Cards */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p
                  className={`mb-4 ${user.isAdmin ? "text-indigo-600" : "text-gray-500"}`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
