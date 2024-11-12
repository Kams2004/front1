import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import './UserSettingsContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSettingsContainer = ({ onProfileComplete }) => {
  const { t } = useTranslation(); // Initialize the hook
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneId: '+1',
    phoneNumber: '555-5678',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    profilePhoto: 'USER.jpeg',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User Information:', formData);
    alert(t('settings.updatedSuccessfully'));
    if (onProfileComplete && typeof onProfileComplete === 'function') {
      onProfileComplete(); // Call the callback to mark the profile as complete
    } else {
      console.error('onProfileComplete is not a function');
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phoneId: '+1',
      phoneNumber: '555-5678',
      address: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      profilePhoto: 'USER.jpeg',
    });
  };

  return (
    <div className="user-settings-container">
      <h2 className="text-center">{t('userSettings')}</h2>
      <div className="blue-line"></div>

      <form className="user-settings-form" onSubmit={handleSubmit}>
        <div className="row">
          {/* First Name */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">{t('firstName')}</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastName">{t('lastName')}</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mr-2 phoneid"
                  name="phoneId"
                  value={formData.phoneId}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="address">{t('address')}</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* City */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="city">{t('city')}</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* State */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="state">{t('state')}</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Zip Code */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="zipCode">{t('zipCode')}</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="profilePhoto">{t('profilePhoto')}</label>
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">{t('updateProfile')}</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>{t('reset')}</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsContainer;
