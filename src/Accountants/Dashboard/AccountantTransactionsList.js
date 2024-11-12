import React, { useState, useEffect, useCallback } from 'react';
import './AccountantTransactionsList.css';
import config from '../../config';

const AccountantTransactionsList = ({ doctors, onDoctorSelect, selectedDoctorId }) => {
  const initialTransactions = [];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorSuggestions, setDoctorSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [totalCommission, setTotalCommission] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / recordsPerPage);

  const fetchDoctorTransactions = useCallback(async (doctorId) => {
    try {
      const response = await fetch(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
      const data = await response.json();

      const transactionsData = data.data_patients.map((patient, index) => {
        const [patientName, details] = Object.entries(patient)[0];
        return {
          id: index + 1,
          patientName,
          examination: details[0],
          cost: parseFloat(details[1]),
          transferDate: new Date(details[2]).toLocaleDateString(),
        };
      });

      setTransactions(transactionsData);
      setTotalCommission(data.commission || 0);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching doctor transactions:', error);
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.baseURL}doctor`);
        const data = await response.json();
        setDoctorSuggestions(data);

        // Only set the initial doctor if no doctor is selected
        if (!selectedDoctorId && data.length > 0) {
          const firstDoctor = data[0];
          setDoctorName(firstDoctor.DoctorName);
          onDoctorSelect(firstDoctor.id);
          await fetchDoctorTransactions(firstDoctor.id);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, [fetchDoctorTransactions, onDoctorSelect, selectedDoctorId]);

  const handleDoctorInputChange = (e) => {
    const input = e.target.value;
    setDoctorName(input);

    if (input.length > 0) {
      const filtered = doctorSuggestions.filter((doctor) =>
        doctor.DoctorName.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 3));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name, id) => {
    setDoctorName(name);
    onDoctorSelect(id);
    setShowSuggestions(false);
    fetchDoctorTransactions(id);
  };

  const handleFilter = async () => {
    if (selectedDoctorId && startDate && endDate) {
      const start = `${startDate} 00:00:00.000`;
      const end = `${endDate} 00:00:00.000`;
      try {
        const response = await fetch(`${config.baseURL}gnu_doctor/${selectedDoctorId}/research/${start}/${end}`);
        const data = await response.json();

        const transactionsData = data.data_patients.map((patient, index) => {
          const [patientName, details] = Object.entries(patient)[0];
          return {
            id: index + 1,
            patientName,
            examination: details[0],
            cost: parseFloat(details[1]),
            transferDate: new Date(details[2]).toLocaleDateString(),
          };
        });

        setTransactions(transactionsData);
        setTotalCommission(data.commission || 0);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching filtered transactions:', error);
      }
    }
  };

  const handleReset = () => {
    if (doctorSuggestions.length > 0) {
      const firstDoctor = doctorSuggestions[0];
      setDoctorName(firstDoctor.DoctorName);
      onDoctorSelect(firstDoctor.id);
      fetchDoctorTransactions(firstDoctor.id);
    }
    setStartDate('');
    setEndDate('');
    setShowSuggestions(false);
  };
  const handlePrint = async () => {
    const allTransactionsResponse = await fetch(`${config.baseURL}gnu_doctor/${selectedDoctorId}/exams-patients`);
    const allTransactionsData = await allTransactionsResponse.json();

    const allTransactions = allTransactionsData.data_patients.map((patient, index) => {
      const [patientName, details] = Object.entries(patient)[0];
      return {
        id: index + 1,
        patientName,
        examination: details[0],
        cost: parseFloat(details[1]),
        transferDate: new Date(details[2]).toLocaleDateString(),
      };
    });

    const printTotalCommission = allTransactionsData.commission || 0;

    const printContent = `
      <html>
        <head>
          <title>Print Transactions</title>
          <style>
            .table { width: 100%; border-collapse: collapse; }
            .table th, .table td { padding: 8px; text-align: left; border: 1px solid #ddd; }
            .table th { background-color: #f8f9fa; }
            .total-commission { text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h2>Accountant Transactions</h2>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Examination</th>
                <th>Commission</th>
                <th>Transfer Date</th>
              </tr>
            </thead>
            <tbody>
              ${allTransactions
                .map(
                  (transaction) => `
                    <tr>
                      <td>${transaction.id}</td>
                      <td>${transaction.patientName}</td>
                      <td>${transaction.examination}</td>
                      <td>${transaction.cost.toFixed(2)}</td>
                      <td>${transaction.transferDate}</td>
                    </tr>`
                )
                .join('')}
            </tbody>
          </table>
          <div class="total-commission">
            <strong>Total Commission: ${printTotalCommission.toFixed(2)}</strong>
          </div>
        </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = transactions.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="transactions-list-container">
      <h2>Accountant Transactions</h2>
      <div className="blue-line"></div>

      <form className="transaction-filter-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              className="form-control"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group autocomplete">
            <label htmlFor="doctor-name">Doctor Name</label>
            <input
              type="text"
              className="form-control"
              id="doctor-name"
              placeholder="Enter doctor name"
              value={doctorName}
              onChange={handleDoctorInputChange}
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
              <div className="suggestions-dropdown">
                {filteredSuggestions.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(doctor.DoctorName, doctor.id)}
                  >
                    {doctor.DoctorName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" className="btn btn-primary" onClick={handleFilter}>
            Search
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="btn btn-danger" onClick={handlePrint}>
            Print
          </button>
        </div>
      </form>

      <div className="records-per-page">
        <label>Records per page:</label>
        <select value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="results-container">
        <h3>Showing {transactions.length} Transactions</h3>
        <table className="table table-hover accountant-transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Examination</th>
              <th>Commission</th>
              <th>Transfer Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length ? (
              currentRecords.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.patientName}</td>
                  <td>{transaction.examination}</td>
                  <td>{transaction.cost.toFixed(2)}</td>
                  <td>{transaction.transferDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="results-container">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button
          className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className={`btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="total-commission">
        <strong>Total Commission: {totalCommission.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default AccountantTransactionsList;
