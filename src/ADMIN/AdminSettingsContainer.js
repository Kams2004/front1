import React, { useState, useEffect } from 'react';
import './AdminSettingsContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from './Avatar';
import axios from 'axios';
import config from '../config';

const AdminSettingsContainer = ({ onProfileComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    group: '',
  });
  const [responseMessage, setResponseMessage] = useState(''); // State for displaying response

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const [firstName, lastName] = storedUser.name.split(" ");
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        group: storedUser.role || '',
      });
    }
  }, []);

  useEffect(() => {
    // Clear response message after 4 seconds
    if (responseMessage) {
      const timer = setTimeout(() => setResponseMessage(''), 4000);
      return () => clearTimeout(timer); // Clear the timeout if component unmounts
    }
  }, [responseMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = formData;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.userId;

    try {
      const response = await axios.put(`${config.baseURL}users/mod/${userId}`, {
        first_name: firstName,
        last_name: lastName,
      });

      // Check if response has data or a message
      if (response.data && !response.data.message) {
        setResponseMessage('Profile updated successfully!');
        onProfileComplete && onProfileComplete();
      } else {
        setResponseMessage(response.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="admin-settings-container">
      <h2 className="text-center">Admin Settings</h2>
      <div className="admin-settings-blue-line"></div>

      {/* Display Response Message */}
      {responseMessage && (
        <div className={`alert ${responseMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {responseMessage}
        </div>
      )}

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="admin-settings-profile-picture-section">
            <Avatar firstName={formData.firstName} lastName={formData.lastName} />
          </div>

          <div className="admin-settings-admin-buttons d-flex flex-column justify-content-around">
            <button type="button" className="btn btn-primary mb-2">
              Modify
            </button>
            <button type="button" className="btn btn-danger">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <div className="admin-settings-form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="admin-settings-form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="admin-settings-form-group">
          <label htmlFor="group">Group</label>
          <input
            type="text"
            className="form-control"
            id="group"
            name="group"
            value={formData.group}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsContainer;
