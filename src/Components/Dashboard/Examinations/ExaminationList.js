import React, { useState } from 'react';
import '../Transaction/TransactionsList'; // Reuse existing styles or create new ones
import 'bootstrap/dist/css/bootstrap.min.css';

const ExaminationList = () => {
  const initialExaminations = [
    { id: 1, examination: 'Blood Test', price: '$100', commission: '$20' },
    { id: 2, examination: 'X-Ray', price: '$150', commission: '$30' },
    { id: 3, examination: 'MRI', price: '$400', commission: '$80' },
    { id: 4, examination: 'CT Scan', price: '$350', commission: '$70' },
    // Add more examination records as needed
  ];

  const [examinations, setExaminations] = useState(initialExaminations);
  const [filterFields, setFilterFields] = useState({
    search: '',
  });

  const handleReset = () => {
    setFilterFields({ search: '' });
    setExaminations(initialExaminations); // Reset to initial state
  };

  return (
    <div className="transactions-list-container">
      <h2 className="text-center">Examination List</h2>
      <div className="blue-line"></div>

      <form className="transaction-filter-form">
        <div className="row">
          {/* Search Field */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="search">Search Examination</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Enter examination name"
                value={filterFields.search}
                onChange={(e) => setFilterFields({ ...filterFields, search: e.target.value })}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="form-buttons text-right">
        <button className="btn btn-primary rounded-pill" type="submit">Search</button>
        <button 
          className="btn btn-secondary rounded-pill" 
          type="reset" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="results-container">
        <h3>Showing {examinations.length} Examinations</h3>
        <table className="table table-hover table-bordered table-striped">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Examination</th>
              <th>Price</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {examinations.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.examination}</td>
                <td>{exam.price}</td>
                <td>{exam.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExaminationList;
