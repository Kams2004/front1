import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './Admin-body.css'; 
import config from '../config';
import axios from 'axios';

export const SmallContainer1 = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation('admin');

  const fetchUserCount = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.baseURL}users/all`);
      setUserCount(response.data.length);
    } catch (err) {
      setError(t('errorFetchingUserCount'));
      console.error('Error fetching user count:', err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Fetch user count on component load
  useEffect(() => {
    fetchUserCount();
  }, [fetchUserCount]);

  return (
    <div className="small-container">
      <i className="bi bi-person-fill users-icon" />
      <div className="text-container">
        <h5 className="title">{t('users')}</h5> 
        {error ? (
          <p className="value text-danger">{error}</p>
        ) : (
          <p className="value">{userCount}</p>
        )}
      </div>
      <div
        className={`loading-icon ${loading ? 'loading' : ''}`}
        onClick={fetchUserCount}
        title={t('reloadUserCount')}
      >
        {loading ? (
          <i className="bi bi-arrow-clockwise spinner-icon" />
        ) : (
          <i className="bi bi-arrow-clockwise" />
        )}
      </div>
    </div>
  );
};
export const SmallContainer2 = () => {
  const [groupCount, setGroupCount] = useState(0);
  const { t } = useTranslation('admin'); // Translation hook

  useEffect(() => {
    const fetchGroupCount = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

        const response = await fetch(`${config.baseURL}roles/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the authorization token in the headers
          },
        });

        const data = await response.json();

        // Check if the data is an array and update the group count
        if (Array.isArray(data)) {
          setGroupCount(data.length);
        } else {
          console.error('Fetched data is not an array:', data);
          setGroupCount(0); // Set group count to 0 if the data is not as expected
        }
      } catch (error) {
        console.error('Error fetching group count:', error);
      }
    };

    fetchGroupCount();
  }, []);
  return (
    <div className="small-container">
      <i className="bi bi-people-fill groups-icon" />
      <div className="text-container">
        <h5 className="title">{t('groups')}</h5> {/* Translated text */}
        <p className="value">{groupCount}</p>
      </div>
    </div>
  );
};
export const SmallContainer3 = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation('admin'); // Translation hook

  useEffect(() => {
    const fetchDoctorCount = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.baseURL}doctor/nbr`);
        setDoctorCount(response.data.Nombre || 0); // Set doctor count from API response
      } catch (err) {
        setError(t('errorFetchingData')); // Assuming translation key for error
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorCount();
  }, [t]);

  return (
    <div className="small-container">
      <i className="bi bi-hospital-fill doctors-icon" />
      <div className="text-container">
        <h5 className="title">{t('doctors')}</h5>
        {loading ? (
          <p className="value">{t('loading')}</p> // Loading state text
        ) : error ? (
          <p className="value error">{error}</p> // Error message
        ) : (
          <p className="value">{doctorCount}</p> // Display the doctor count
        )}
      </div>
    </div>
  );
};
export const SmallContainer4 = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation('admin');

  useEffect(() => {
    const fetchRequestCount = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.baseURL}requete/nbr`);
        setRequestCount(response.data.Nbr || 0); // Set request count from API response
      } catch (err) {
        setError(t('errorFetchingData')); // Assuming translation key for error
      } finally {
        setLoading(false);
      }
    };
    fetchRequestCount();
  }, [t]);

  return (
    <div className="small-container">
      <i className="bi bi-bell-fill requests-icon" />
      <div className="text-container">
        <h5 className="title">{t('requests')}</h5>
        {loading ? (
          <p className="value">{t('loading')}</p> // Loading state text
        ) : error ? (
          <p className="value error">{error}</p> // Error message
        ) : (
          <p className="value">{requestCount}</p> // Display the request count
        )}
      </div>
    </div>
  );
};

export const SmallContainer5 = () => {
  const { t } = useTranslation('admin'); // Translation hook
  return (
    <div className="small-container small-container-5">
      <i className="bi bi-person-check-fill patients-icon" />
      <div className="text-container">
        <h5 className="title">{t('patients')}</h5> {/* Translated text */}
        <p className="value">------</p>
      </div>
    </div>
  );
};

export const SmallContainer6 = () => {
  const { t } = useTranslation('admin'); // Translation hook
  return (
    <div className="small-container small-container-6">
      <i className="bi bi-file-earmark-medical-fill prescriptions-icon" />
      <div className="text-container">
        <h5 className="title">{t('prescriptions')}</h5> {/* Translated text */}
        <p className="value">------</p>
      </div>
    </div>
  );
};

export const LargeContainer1 = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation('admin');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${config.baseURL}requete/`, {
          withCredentials: true,
        });
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError(t('errorFetchingRequests'));
      }
    };

    fetchRequests();
  }, [t]);

  const handleDecline = async (id) => {
    try {
      await axios.delete(`${config.baseURL}requete/del/${id}`, {
        withCredentials: true,
      });
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
      setError(t('errorDeletingRequest'));
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRequests = requests.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(requests.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="wide-container">
      <h3>{t('recentRequests')}</h3>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('no')}</th>
            <th>{t('name')}</th>
            <th>{t('email')}</th>
            <th>{t('message')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request, index) => (
            <tr key={request.id}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{`${request.first_name} ${request.last_name}`}</td>
              <td>{request.email}</td>
              <td>{request.message}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-button validate-button">{t('validate')}</button>
                  <button
                    className="action-button decline-button"
                    onClick={() => handleDecline(request.id)}
                  >
                    {t('decline')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {t('previous')}
        </button>
        <span>{t('page')} {currentPage} {t('of')} {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export const LargeContainer2 = () => {
  const { t } = useTranslation('admin'); 
  return (
    <div className="wide-container">
      <h3>{t('recentPrescriptions')}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('no')}</th> 
            <th>{t('patientName')}</th>
            <th>{t('doctorName')}</th>
            <th>{t('medication')}</th>
            <th>{t('dosage')}</th>
            <th>{t('datePrescribed')}</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Dr. Smith</td>
            <td>Amoxicillin</td>
            <td>500mg</td>
            <td>2024-09-20</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>Dr. Johnson</td>
            <td>Lisinopril</td>
            <td>10mg</td>
            <td>2024-09-21</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Emily Johnson</td>
            <td>Dr. Brown</td>
            <td>Metformin</td>
            <td>850mg</td>
            <td>2024-09-22</td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};
