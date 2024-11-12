import React, { useState, useEffect } from 'react';
import './DoctorManagement.css';
import { useTranslation } from 'react-i18next';
import config from '../config';

const getStatusButton = (status, t) => {
  switch (status) {
    case 'Complete':
      return <button className="btn btn-success btn-sm rounded-pill">{t('complete')}</button>;
    case 'Incomplete':
      return <button className="btn btn-danger btn-sm rounded-pill">{t('incomplete')}</button>;
    case 'Pending':
      return <button className="btn btn-warning btn-sm rounded-pill">{t('pending')}</button>;
    default:
      return <button className="btn btn-danger btn-sm rounded-pill">{t('incomplete')}</button>;
  }
};

const DoctorManagement = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [formData, setFormData] = useState({
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
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.baseURL}/doctor`);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDoctorClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${config.baseURL}doctor/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const errorMessage = data.message || data.Message || data["Message "];

      if (errorMessage) {
        setMessage({ type: 'error', text: errorMessage });
      } else {
        setMessage({ type: 'success', text: 'Doctor registered successfully!' });
        setShowForm(false);
        setDoctors((prevDoctors) => [...prevDoctors, data]);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setMessage(null);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(doctors.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="doctor-management-container">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          {message && (
            <div className={`doctor-management-message ${message.type === 'success' ? 'success' : 'error'}`}>
              {message.text}
            </div>
          )}
          <h3>{t('doctors')}</h3>
          {!showForm ? (
            <>
              <button
                className="doctor-management-add-doctor-button"
                onClick={handleAddDoctorClick}
              >
                {t('Add Doctor')}
              </button>
              <table className="table table-striped doctor-management-table">
                <thead>
                  <tr>
                    <th>{t('matricule')}</th>
                    <th>{t('name')}</th>
                    <th>{t('surname')}</th>
                    <th>{t('placeOfBirth')}</th>
                    <th>{t('phoneNumber')}</th>
                    <th>{t('nationality')}</th>
                    <th>{t('CNI')}</th>
                    <th>{t('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.DoctorNO}</td>
                      <td>{doctor.DoctorName}</td>
                      <td>{doctor.DoctorLastname}</td>
                      <td>{doctor.DoctorPOB}</td>
                      <td>{doctor.DoctorPhone}</td>
                      <td>{doctor.DoctorNat}</td>
                      <td>{doctor.DoctorCNI}</td>
                      <td>{getStatusButton('Incomplete', t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="pagination-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <form className="doctor-management-form" onSubmit={handleFormSubmit}>
              <div className="doctor-management-number-speciality-group">
                <div className="doctor-management-input-group">
                  <label>{t('Doctor Number')}</label>
                  <input
                    type="text"
                    name="DoctorNO"
                    value={formData.DoctorNO}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="doctor-management-input-group">
                  <label>{t('Speciality')}</label>
                  <input
                    type="text"
                    name="Speciality"
                    value={formData.Speciality}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="doctor-management-name-group">
                <div className="doctor-management-input-group">
                  <label>{t('First Name')}</label>
                  <input
                    type="text"
                    name="DoctorName"
                    value={formData.DoctorName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="doctor-management-input-group">
                  <label>{t('Last Name')}</label>
                  <input
                    type="text"
                    name="DoctorLastname"
                    value={formData.DoctorLastname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="doctor-management-dob-pob-group">
                <div className="doctor-management-input-group">
                  <label>{t('Date of Birth')}</label>
                  <input
                    type="date"
                    name="DoctorDOB"
                    value={formData.DoctorDOB}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="doctor-management-input-group">
                  <label>{t('Place of Birth')}</label>
                  <input
                    type="text"
                    name="DoctorPOB"
                    value={formData.DoctorPOB}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="doctor-management-phone-group">
                <div className="doctor-management-input-group">
                  <label>{t('Primary Phone')}</label>
                  <input
                    type="text"
                    name="DoctorPhone"
                    value={formData.DoctorPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="doctor-management-input-group">
                  <label>{t('Secondary Phone')}</label>
                  <input
                    type="text"
                    name="DoctorPhone2"
                    value={formData.DoctorPhone2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="doctor-management-input-group">
                <label>{t('Email')}</label>
                <input
                  type="email"
                  name="DoctorEmail"
                  value={formData.DoctorEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="doctor-management-nat-cni-group">
                <div className="doctor-management-input-group">
                  <label>{t('Nationality')}</label>
                  <input
                    type="text"
                    name="DoctorNat"
                    value={formData.DoctorNat}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="doctor-management-input-group">
                  <label>{t('CNI Number')}</label>
                  <input
                    type="text"
                    name="DoctorCNI"
                    value={formData.DoctorCNI}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="doctor-management-button-group">
                <button type="button" className="doctor-management-cancel-button" onClick={handleCancel}>
                  {t('Cancel')}
                </button>
                <button type="submit" className="doctor-management-submit-button">
                  {t('Register')}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorManagement;
