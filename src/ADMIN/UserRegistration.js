import React, { useState, useEffect } from 'react';
import './UserRegistration.css'; // Import CSS for registration styling
import axios from 'axios'; // Import axios for making API calls
import config from '../config';
import { useTranslation } from 'react-i18next'; // Import translation hook

const UserRegistration = ({ onRegister, onCancel, user }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [newUser, setNewUser] = useState({
    email: user ? user.email : '',
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    roles: user ? user.roles : [], // Roles as an array to support multiple roles
  });

  const [roles, setRoles] = useState([]); // Store fetched roles
  const [message, setMessage] = useState(''); // State to hold success/error messages
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  const [isRegistering, setIsRegistering] = useState(!user); // Track if registering or updating

  // Function to show success or error messages
  const showMessage = (msg, type) => {
    setMessage(msg); // Set the message text
    setMessageType(type); // Set the message type ('success' or 'error')

    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      setMessage(''); // Clear the message
      setMessageType(null); // Reset message type
    }, 5000);
  };

  // Populate form with existing user data if editing
  useEffect(() => {
    if (user) {
      setNewUser({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles.map((role) => role.name), // Store roles as an array
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
    setNewUser((prevUser) => {
      const newRoles = prevUser.roles.includes(roleName)
        ? prevUser.roles.filter((role) => role !== roleName) // Remove role if already selected
        : [...prevUser.roles, roleName]; // Add role if not selected
      return { ...prevUser, roles: newRoles };
    });
  };

  // Handle form submission (either create or update user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare user data according to the required format
      const userData = {
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        roles: newUser.roles, // Send roles as an array
      };

      if (isRegistering) {
        // Create new user
        await axios.post(`${config.baseURL}signup`, userData);
        showMessage(t('USER_REGISTRATION_SUCCESS'), 'success'); // Translation for success message
      } else {
        // Update existing user
        await axios.put(`${config.baseURL}users/mod/${user.id}`, userData);
        showMessage(t('USER_UPDATE_SUCCESS'), 'success'); // Translation for success message
      }

      onRegister(); // Notify parent to refresh the user list
    } catch (error) {
      // Handle errors and display message from the API if available
      const errorMsg =
        error.response && error.response.data && error.response.data.Message
          ? error.response.data.Message
          : isRegistering
          ? t('USER_REGISTRATION_FAILED') // Translation for registration error
          : t('USER_UPDATE_FAILED'); // Translation for update error
      showMessage(errorMsg, 'error');
    }
  };

  return (
    <div className="user-registration-container">
      <h4 className="text-center mb-4">
        {isRegistering ? t('REGISTER_USER') : t('UPDATE_USER')}
      </h4>

      {/* Display success or error message */}
      {message && (
        <p className={`text-center ${messageType === 'error' ? 'text-danger' : 'text-success'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="container">
        {/* First Name and Last Name Fields */}
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control rounded"
              name="first_name"
              placeholder={t('FIRST_NAME')}
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
              placeholder={t('LAST_NAME')}
              value={newUser.last_name}
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
              placeholder={t('EMAIL')}
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Roles selection */}
        <div className="mb-3">
          <label className="form-label">{t('ROLES')}</label>
          {roles.map((role) => (
            <div key={role.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={newUser.roles.includes(role.name)}
                onChange={() => handleRoleChange(role.name)}
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
            {isRegistering ? t('CONFIRM') : t('UPDATE')}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary rounded-pill">
            {t('CANCEL')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
