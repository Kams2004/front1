import React, { useState } from 'react';
import './TransactionsList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsList = () => {
  const initialTransactions = [
    { id: 1, date: '2024-09-18', amount: '$100', description: 'Payment from Patient A' },
    { id: 2, date: '2024-09-17', amount: '$250', description: 'Payment from Patient B' },
    { id: 3, date: '2024-09-16', amount: '$300', description: 'Payment from Patient C' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchFields, setSearchFields] = useState({
    startDate: '',
    endDate: '',
    status: '',
    commandNo: '',
    payerNo: '',
    operatorNo: '',
    minAmount: '',
    maxAmount: '',
  });

  const handleReset = () => {
    setSearchFields({
      startDate: '',
      endDate: '',
      status: '',
      commandNo: '',
      payerNo: '',
      operatorNo: '',
      minAmount: '',
      maxAmount: '',
    });
    setTransactions(initialTransactions);
  };

  return (
    <div className="tl-transactions-list-container">
      <h2 className="text-center">List of Transactions</h2>
      <div className="tl-blue-line"></div>
      
      <form className="tl-transaction-filter-form">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input 
                type="date" 
                className="tl-form-control" 
                id="startDate" 
                value={searchFields.startDate}
                onChange={(e) => setSearchFields({ ...searchFields, startDate: e.target.value })}
              />
            </div>
            {/* Remaining form inputs... */}
          </div>
        </div>
      </form>

      <div className="tl-form-buttons tl-text-right">
        <button className="btn btn-primary tl-btn tl-btn-primary" type="submit">Search</button>
        <button 
          className="btn btn-secondary tl-btn tl-btn-secondary" 
          type="reset" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="tl-results-container">
        <h3>Showing {transactions.length} Results</h3>
        <table className="tl-table tl-table-hover tl-table-bordered tl-table-striped">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
