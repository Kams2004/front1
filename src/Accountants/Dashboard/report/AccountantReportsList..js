import React, { useState, useEffect } from 'react';
import './AccountantReportsList.css';
import config from '../../../config';
import { useTranslation } from "react-i18next";

const AccountantReportsList = ({ selectedReportType }) => {
  const [startDate, setStartDate] = useState('');
  const { t } = useTranslation();
  const [endDate, setEndDate] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [errorMessage, setErrorMessage] = useState('');
  const [synthesisData, setSynthesisData] = useState({});
  const [isSelectAll, setIsSelectAll] = useState(false);
  const formatNumberWithSpaces = (number) => {
    return number
      .toFixed(2) // Ensure two decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Add spaces as thousand separators
  };
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.baseURL}doctor/`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const filteredDoctors = doctors.filter(doctor =>
    doctor.DoctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.DoctorLastname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentRecords = filteredDoctors.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredDoctors.length / recordsPerPage);

  const handleCheckboxChange = (doctorId) => {
    setSelectedDoctors(prevSelectedDoctors =>
      prevSelectedDoctors.includes(doctorId)
        ? prevSelectedDoctors.filter(id => id !== doctorId)
        : [...prevSelectedDoctors, doctorId]
    );
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedDoctors([]);
    } else {
      setSelectedDoctors(filteredDoctors.map(doctor => doctor.id));
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setSelectedDoctors([]);
    setSynthesisData({});
    setErrorMessage('');
    setIsSelectAll(false);
  };

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      setErrorMessage('Please provide both start and end dates.');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    if (selectedDoctors.length === 0) {
      setErrorMessage('Please select at least one doctor.');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    const doctorsList = JSON.stringify(selectedDoctors);
    const url = `${config.baseURL}gnu_doctor/commissions_doctors/${doctorsList}/${startDate} 00:00:00.000/${endDate} 00:00:00.000`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSynthesisData(data);
    } catch (error) {
      console.error('Error fetching synthesis data:', error);
    }
  };

  const handlePrint = () => {
    const totalCommission = Object.values(synthesisData).reduce((sum, val) => sum + val, 0);
    const printContent = `
      <html>
        <head>
          <title>Synthesis Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; text-align: right; }
          </style>
        </head>
        <body>
          <h2>Synthesis Report from ${startDate} to ${endDate}</h2>
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(synthesisData).map(([doctorName, commission]) =>
                `<tr><td>${doctorName}</td><td>${commission} CFA</td></tr>`
              ).join('')}
            </tbody>
          </table>
          <div class="total">Total Commission: ${totalCommission} CFA</div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="reports-list-container">
      <h2>{t("accountantReports.title")}</h2>
      <div className="blue-line mb-4"></div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form className="report-filter-form mb-3 d-flex align-items-center justify-content-between">
        <div className="date-inputs d-flex align-items-center">
          <div className="form-group start-date-field">
            <label htmlFor="start-date">{t("accountantReports.startDate")}</label>
            <input
              type="date"
              className="form-control"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group end-date-field">
            <label htmlFor="end-date">{t("accountantReports.endDate")}</label>
            <input
              type="date"
              className="form-control"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-buttons d-flex">
          <button type="button" className="btn btn-primary mr-2" onClick={handleGenerate}>
            {t("accountantReports.generate")}
          </button>
          <button type="button" className="btn btn-secondary mr-2" onClick={handleReset}>
            {t("accountantReports.reset")}
          </button>
          <button type="button" className="btn btn-danger" onClick={handlePrint}>
            {t("accountantReports.print")}
          </button>
        </div>
      </form>

      <div className="d-flex align-items-stretch mb-3">
        <div className="summary-container p-3 flex-fill">
          <h5>{t("accountantReports.doctorSummary")}</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={t("accountantReports.searchDoctor")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-search" type="button">
                <i className="bi bi-search"></i> {t("actions.search")}
              </button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{t("accountantReports.firstName")}</th>
                <th>{t("accountantReports.lastName")}</th>
                <th>{t("accountantReports.specialty")}</th>
                <th>
                  {t("accountantReports.select")} ({selectedDoctors.length})
                  <input
                    type="checkbox"
                    className="form-check-input ml-2"
                    onChange={handleSelectAll}
                    checked={isSelectAll}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.DoctorName}</td>
                  <td>{doctor.DoctorLastname}</td>
                  <td>{doctor.Speciality}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={() => handleCheckboxChange(doctor.id)}
                      checked={selectedDoctors.includes(doctor.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <label>{t("accountantReports.recordsPerPage")}</label>
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="form-select ml-2"
                style={{ width: 'auto' }}
              >
                {[6, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="btn btn-primary mx-1"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                {t("accountantReports.previous")}
              </button>
              <span>{t("accountantReports.page", { currentPage, totalPages })}</span>
              <button
                className="btn btn-primary mx-1"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {t("accountantReports.next")}
              </button>
            </div>
          </div>
        </div>

        <div className="vertical-separator mx-3"></div>

        <div className="detailed-container p-3 flex-fill">
          <h5>{t("accountantReports.synthesisReport")}</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>{t("accountantReports.doctorName")}</th>
                <th>{t("accountantReports.commission")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(synthesisData).map(([doctorName, commission]) => (
                <tr key={doctorName}>
                  <td className="bold-text">{doctorName}</td>
                  <td className="bold-text">{commission} CFA</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-commission mt-2">
  {t("accountantReports.totalCommission")}: {formatNumberWithSpaces(Object.values(synthesisData).reduce((sum, val) => sum + val, 0))} CFA
</div>
        </div>
      </div>
    </div>
  );
};

export default AccountantReportsList;