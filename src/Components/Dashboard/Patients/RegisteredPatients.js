import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import './RegisteredPatients.css';
import config from '../../../config';

const RegisteredPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  // Stabilize fetchAllPatients with useCallback
  const fetchAllPatients = useCallback(async () => {
    try {
      setErrorMessage('');
      setShowErrorModal(false); // Reset modal state
  
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const doctorId = storedUser?.doctorId;
  
      if (!doctorId) {
        setErrorMessage("Doctor ID is missing from local storage.");
        if (!isInitialFetch) setShowErrorModal(true); // Show modal only if not the initial fetch
        return;
      }
  
      const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
      const dataPatients = response.data?.data_patients || [];
      setPatients(dataPatients);
  
      const total = dataPatients.reduce((sum, patient) => {
        const commission = parseFloat(Object.values(patient)[0][1]);
        return sum + (isNaN(commission) ? 0 : commission);
      }, 0);
  
      setTotalCommission(total);
      setIsInitialFetch(false); // Mark that the initial fetch has completed
    } catch (error) {
      console.error('Error in fetchAllPatients:', error);
      setErrorMessage('Failed to fetch patient data. Please try again later.');
      if (!isInitialFetch) setShowErrorModal(true); // Show modal only if not the initial fetch
    }
  }, [isInitialFetch]);
  
  useEffect(() => {
    fetchAllPatients();
  }, [fetchAllPatients]);


  const handleFilter = () => {
    if (startDate && endDate) {
      fetchPatientsByDateRange(startDate, endDate);
    } else {
      setErrorMessage('Please enter both start and end dates to filter.');
      setShowErrorModal(true);
    }
  };

  const fetchPatientsByDateRange = async (start, end) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const doctorId = storedUser?.doctorId;
  
      if (!doctorId) {
        setErrorMessage("Doctor ID is missing from local storage.");
        setShowErrorModal(true);
        return;
      }
  
      const response = await axios.get(
        `http://65.21.73.170:2052/gnu_doctor/${doctorId}/research/${start}%2000:00:00.000/${end}%2000:00:00.000`
      );
      const dataPatients = response.data.data_patients;
      setPatients(dataPatients);
  
      const total = dataPatients.reduce((sum, patient) => {
        const commission = parseFloat(Object.values(patient)[0][1]);
        return sum + (isNaN(commission) ? 0 : commission);
      }, 0);
  
      setTotalCommission(total);
    } catch (error) {
      console.error('Error fetching patients by date range:', error);
      setErrorMessage('Failed to fetch data by date range. Please try again later.');
      setShowErrorModal(true);
    }
  };
  

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    fetchAllPatients();
    setCurrentPage(1);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentPatients = patients.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (indexOfLastRecord < patients.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rp-transactions-list-container">
      <h2 className="text-center">Registered Patients</h2>
      <div className="rp-blue-line"></div>
      
      <form className="rp-transaction-filter-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control rp-form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                className="form-control rp-form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="rp-form-buttons text-right">
        <button className="btn btn-primary rp-btn" type="button" onClick={handleFilter}>
          Filter
        </button>
        <button 
          className="btn btn-secondary rp-btn" 
          type="reset" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="rp-results-container">
        <h3>Showing {currentPatients.length} of {patients.length} Patients</h3>
        <table className="rp-table table-hover table-bordered table-striped">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Examination</th>
              <th>Commission</th>
              <th>Transfer Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient, index) => {
              const [name, details] = Object.entries(patient)[0];
              return (
                <tr key={index}>
                  <td>{indexOfFirstRecord + index + 1}</td>
                  <td className="rp-text-left">{name}</td> {/* Left-align Patient Name */}
                  <td className="rp-text-left">{details[0]}</td> {/* Left-align Examination */}
                  <td className="rp-text-right">{parseFloat(details[1]).toFixed(2).replace(/\.?0+$/, '')}</td> {/* Right-align Commission */}
                  <td>{details[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="rp-total-commission-container">
          <span className="rp-total-label">Total:</span>
          <span className="rp-total-value">{totalCommission.toFixed(2).replace(/\.?0+$/, '')} CFA</span>
        </div>

        <div className="pagination-controls text-center">
          <button className="btn btn-primary m-1" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} </span>
          <button className="btn btn-primary m-1" onClick={nextPage} disabled={indexOfLastRecord >= patients.length}>
            Next
          </button>
        </div>
      </div>

      {/* Error Modal */}
      {errorMessage && (
        <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowErrorModal(false)}></button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <ExclamationCircleFill className="me-2 text-danger" size={24} /> {/* Exclamation icon in red */}
                <p className="text-danger m-0">{errorMessage}</p> {/* Red error text */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowErrorModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredPatients;
