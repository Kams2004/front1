import React, { useState, useEffect } from 'react';
import './SettingsContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../../../../config';

const SettingsContainer = ({ onProfileComplete }) => {
  const [formData, setFormData] = useState({
    DoctorNO: '',
    DoctorName: '',
    DoctorLastname: '',
    DoctorDOB: '',
    DoctorPhone: '',
    DoctorPhone2: '',
    DoctorEmail: '', // Ensure 'Email' is initialized here
    DoctorPOB: '',
    DoctorNat: '',
    DoctorCNI: '',
    Speciality: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const doctorId = storedUser?.doctorId;
  
    if (!doctorId) {
      alert("Doctor ID is missing from local storage.");
      return;
    }
  
    axios.get(`${config.baseURL}doctor/informations/${doctorId}`, {
      withCredentials: true
    })
    .then((response) => {
      const data = response.data;
  
      const formattedDate = data.DoctorDOB ? new Date(data.DoctorDOB).toISOString().split('T')[0] : '';
  
      // Map DoctorEmail to Email in formData
      setFormData({
        DoctorNO: data.DoctorNO || '',
        DoctorName: data.DoctorName || '',
        DoctorLastname: data.DoctorLastname || '',
        DoctorDOB: formattedDate,
        DoctorPhone: data.DoctorPhone || '',
        DoctorPhone2: data.DoctorPhone2 || '',
        DoctorEmail: data.DoctorEmail || '',  // Map DoctorEmail to Email
        DoctorPOB: data.DoctorPOB || '',
        DoctorNat: data.DoctorNat || '',
        DoctorCNI: data.DoctorCNI || '',
        Speciality: data.Speciality || '',
      });
    })
    .catch((error) => {
      console.error("Error fetching doctor data:", error);
      alert("Failed to fetch doctor data. Please try again.");
    });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const doctorId = storedUser?.doctorId;

    if (!doctorId) {
      alert("Doctor ID is missing from local storage.");
      return;
    }

    const requiredFields = [
      'DoctorNO', 'DoctorName', 'DoctorLastname', 'DoctorDOB', 
      'DoctorPhone', 'DoctorEmail', 'DoctorPOB', 'DoctorNat', 'DoctorCNI', 'Speciality'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.put(
        `${config.baseURL}doctor/update/${doctorId}`,
        formData,
        { withCredentials: true }
      );

      console.log('Response from server:', response.data);
      alert('Profile updated successfully!');

      if (onProfileComplete && typeof onProfileComplete === 'function') {
        onProfileComplete();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      alert(errorMessage);
    }
  };

  const handleReset = () => {
    setFormData({
      DoctorNO: '',
      DoctorName: '',
      DoctorLastname: '',
      DoctorDOB: '',
      DoctorPhone: '',
      DoctorPhone2: '',
      DoctorEmail: '',
      DoctorPOB: '',
      DoctorNat: '',
      DoctorCNI: '',
      Speciality: ''
    });
  };

  return (
    <div className="settings-container">
      <h2 className="text-center">Doctor Settings</h2>
      <div className="blue-line"></div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="row">
          {/* Doctor Number */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorNO">Doctor Number</label>
              <input
                type="text"
                className="form-control"
                id="DoctorNO"
                name="DoctorNO"
                value={formData.DoctorNO}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Speciality */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Speciality">Speciality</label>
              <input
                type="text"
                className="form-control"
                id="Speciality"
                name="Speciality"
                value={formData.Speciality}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorLastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="DoctorLastname"
                name="DoctorLastname"
                value={formData.DoctorLastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* First Name */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="DoctorName"
                name="DoctorName"
                value={formData.DoctorName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorDOB">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="DoctorDOB"
                name="DoctorDOB"
                value={formData.DoctorDOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Place of Birth */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorPOB">Place of Birth</label>
              <input
                type="text"
                className="form-control"
                id="DoctorPOB"
                name="DoctorPOB"
                value={formData.DoctorPOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Primary Phone */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorPhone">Primary Phone</label>
              <input
                type="text"
                className="form-control"
                id="DoctorPhone"
                name="DoctorPhone"
                value={formData.DoctorPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Secondary Phone */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorPhone2">Secondary Phone</label>
              <input
                type="text"
                className="form-control"
                id="DoctorPhone2"
                name="DoctorPhone2"
                value={formData.DoctorPhone2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="DoctorEmail"
                name="DoctorEmail"
                value={formData.DoctorEmail} // Accessing 'Email' directly from formData
                onChange={handleChange}
                required
              />
            </div>
          </div>


          {/* Nationality */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorNat">Nationality</label>
              <input
                type="text"
                className="form-control"
                id="DoctorNat"
                name="DoctorNat"
                value={formData.DoctorNat}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* CNI Number */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="DoctorCNI">CNI Number</label>
              <input
                type="text"
                className="form-control"
                id="DoctorCNI"
                name="DoctorCNI"
                value={formData.DoctorCNI}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Update Profile</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsContainer;
