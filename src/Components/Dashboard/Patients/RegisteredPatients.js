import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import './RegisteredPatients.css';
import config from '../../../config';
import { useTranslation } from 'react-i18next';
import { Accordion, Card } from 'react-bootstrap';

const RegisteredPatients = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [patients, setPatients] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const fetchAllPatients = useCallback(async () => {
    try {
      setErrorMessage('');
      setShowErrorModal(false);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const doctorId = storedUser?.doctorId;

      if (!doctorId) {
        setErrorMessage(t("error.doctorIDMissing"));
        if (!isInitialFetch) setShowErrorModal(true);
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
      setIsInitialFetch(false);
    } catch (error) {
      console.error('Error in fetchAllPatients:', error);
      setErrorMessage(t("error.fetchPatients"));
      if (!isInitialFetch) setShowErrorModal(true);
    }
  }, [isInitialFetch, t]);

  useEffect(() => {
    fetchAllPatients();
  }, [fetchAllPatients]);

  const handleFilter = () => {
    if (startDate && endDate) {
      fetchPatientsByDateRange(startDate, endDate);
    } else {
      setErrorMessage(t("error.enterDates"));
      setShowErrorModal(true);
    }
  };

  const fetchPatientsByDateRange = async (start, end) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const doctorId = storedUser?.doctorId;

      if (!doctorId) {
        setErrorMessage(t("error.doctorIDMissing"));
        setShowErrorModal(true);
        return;
      }

      const response = await axios.get(
        `${config.baseURL}gnu_doctor/${doctorId}/research/${start}%2000:00:00.000/${end}%2000:00:00.000`
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
      setErrorMessage(t("error.fetchByDateRange"));
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

  const truncateName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length > 2 ? `${nameParts[0]} ${nameParts[1]}` : name;
  };

  return (
    <div className="rp-transactions-list-container">
      <h2 className="text-center">{t("patients.title")}</h2>
      <div className="rp-blue-line"></div>

      <form className="rp-transaction-filter-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">{t("patients.startDate")}</label>
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
              <label htmlFor="endDate" className="form-label">{t("patients.endDate")}</label>
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
          {t("patients.filter")}
        </button>
        <button 
          className="btn btn-secondary rp-btn" 
          type="reset" 
          onClick={handleReset}
        >
          {t("patients.reset")}
        </button>
      </div>

      <div className="rp-results-container">
        <h3>{t("patients.showing", { count: currentPatients.length, total: patients.length })}</h3>
        <div className="rp-accordion-container">
    <Accordion>
        {currentPatients.map((patient, index) => {
            const [name, details] = Object.entries(patient)[0];
            const truncatedName = truncateName(name);

            return (
                <Card key={index} className="mb-3">
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                            <div className="d-flex justify-content-between w-100">
                                <span>{truncatedName}</span>
                                <span>{parseFloat(details[1]).toFixed(2).replace(/\.?0+$/, '')} CFA</span>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex justify-content-between">
                                <span>{details[0]}</span>
                                <span>{details[2]}</span>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            );
        })}
    </Accordion>
</div>


        {/* Desktop/Table View: Table */}
        <div className="rp-table-container">
          <table className="rp-table table-hover table-bordered table-striped">
            <thead className="thead-light">
              <tr>
                <th>{t("patients.id")}</th>
                <th>{t("patients.patientName")}</th>
                <th>{t("patients.examination")}</th>
                <th>{t("patients.commission")}</th>
                <th>{t("patients.transferDate")}</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => {
                const [name, details] = Object.entries(patient)[0];
                return (
                  <tr key={index}>
                    <td>{indexOfFirstRecord + index + 1}</td>
                    <td className="rp-text-left">{name}</td>
                    <td className="rp-text-left">{details[0]}</td>
                    <td className="rp-text-right">{parseFloat(details[1]).toFixed(2).replace(/\.?0+$/, '')}</td>
                    <td>{details[2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
      <div className="rp-total-commission-container">
            <span className="rp-total-label">{t("patients.total")}:</span>
            <span className="rp-total-value">{totalCommission.toFixed(2).replace(/\.?0+$/, '')} CFA</span>
          </div>
      <div className="pagination-controls text-center">
            <button className="btn btn-primary m-1" onClick={prevPage} disabled={currentPage === 1}>
              {t("patients.previous")}
            </button>
            <span> {t("patients.page", { page: currentPage })} </span>
            <button className="btn btn-primary m-1" onClick={nextPage} disabled={indexOfLastRecord >= patients.length}>
              {t("patients.next")}
            </button>
          </div>
      {/* Error Modal */}
      {errorMessage && (
        <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t("patients.error")}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowErrorModal(false)}></button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <ExclamationCircleFill className="me-2 text-danger" size={24} />
                <p className="text-danger m-0">{errorMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowErrorModal(false)}>
                  {t("patients.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredPatients;
