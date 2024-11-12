import React, { useState, useEffect } from 'react';
import './UserRegistration.css'; // Import CSS for registration styling
import axios from 'axios'; // Import axios for making API calls
import config from '../config';

const UserRegistration = ({ onRegister, onCancel, user }) => {
  const [newUser, setNewUser] = useState({
    username: user ? user.username : '',
    password: '',
    confirmPassword: '',
    email: user ? user.email : '',
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    roles: [], // Roles as an array to support multiple roles
  });

  const [roles, setRoles] = useState([]); // Store fetched roles
  const [message, setMessage] = useState(''); // State to hold success/error messages
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  const [isRegistering, setIsRegistering] = useState(!user); // Track if registering or updating

  // Function to show success or error messages
  const showMessage = (msg, type) => {
    setMessage(msg); // Set the message text
    setMessageType(type); // Set the message type ('success' or 'error')

    // Automatically clear the message after 3 seconds
    setTimeout(() => {
      setMessage(''); // Clear the message
      setMessageType(null); // Reset message type
    }, 3000);
  };

  // Populate form with existing user data if editing
  useEffect(() => {
    if (user) {
      setNewUser({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: '', // Don't pre-fill password for security reasons
        confirmPassword: '',
        roles: user.roles.map(role => role.name), // Store roles as an array
      });
      setIsRegistering(false); // Set to false if updating
    }
  }, [user]);

  // Fetch available roles from the API on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${config.baseURL}roles/`);
        setRoles(response.data); // Set the fetched roles in state
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle role selection
  const handleRoleChange = (roleName) => {
    setNewUser(prevUser => {
      const newRoles = prevUser.roles.includes(roleName)
        ? prevUser.roles.filter(role => role !== roleName) // Remove role if already selected
        : [...prevUser.roles, roleName]; // Add role if not selected
      return { ...prevUser, roles: newRoles };
    });
  };

 // Handle form submission (either create or update user)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (newUser.password === newUser.confirmPassword) {
    try {
      // Prepare user data according to the required format
      const userData = {
        username: newUser.username,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password, // Include password for registration or update
        roles: newUser.roles // Send roles as an array
      };

      if (isRegistering) {
        // Create new user
        await axios.post(`${config.baseURL}/signup`, userData);
        showMessage('User registration successful!', 'success'); // Show specific success message for registration
      } else {
        // Update existing user
        await axios.put(`${config.baseURL}/users/mod/${user.id}`, userData);
        showMessage('User updated successfully!', 'success'); // Show specific success message for updates
      }

      onRegister(); // Notify parent to refresh the user list
    } catch (error) {
      // Handle errors and display message from the API if available
      const errorMsg = error.response && error.response.data && error.response.data.Message
        ? error.response.data.Message
        : isRegistering
          ? 'Registration failed. Please try again.' // More specific error message for registration
          : 'User update failed. Please try again.'; // More specific error message for update
      showMessage(errorMsg, 'error');
    }
  } else {
    showMessage('Passwords do not match!', 'error');
  }
};


  return (
    <div className="user-registration-container">
      <h4 className="text-center mb-4">{isRegistering ? 'Register User' : 'Update User'}</h4>

      {/* Display success or error message */}
      {message && (
        <p className={`text-center ${messageType === 'error' ? 'text-danger' : 'text-success'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="container">
        {/* Username Field */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control rounded"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* First Name and Last Name Fields */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control rounded"
              name="first_name"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control rounded"
              name="last_name"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Password Fields */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="password"
              className="form-control rounded"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="password"
              className="form-control rounded"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="email"
              className="form-control rounded"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Roles selection */}
        <div className="mb-3">
          <label className="form-label">Roles</label>
          {roles.map((role) => (
            <div key={role.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={newUser.roles.includes(role.name)}
                onChange={() => handleRoleChange(role.name)} // Update roles on checkbox change
                id={`role-${role.id}`}
              />
              <label className="form-check-label" htmlFor={`role-${role.id}`}>
                {role.name}
              </label>
            </div>
          ))}
        </div>

        {/* Submit and Cancel buttons */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary rounded-pill me-2">
            {isRegistering ? 'Confirm' : 'Update User'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary rounded-pill">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
