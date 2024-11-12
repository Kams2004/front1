// src/TransactionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Transaction } from './TransactionModel';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/today-transactions');
        
        // Map the response data to Transaction model instances
        const transactionData = response.data.map(item => 
          new Transaction(item.id, item.amount, item.commission, item.transactionDate)
        );

        setTransactions(transactionData);
      } catch (err) {
        console.error('Error fetching transactions:', err.response ? err.response.data : err.message);
        setError('Error fetching transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Today's Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <p><strong>ID:</strong> {transaction.id}</p>
            <p><strong>Amount:</strong> {transaction.amount}</p>
            <p><strong>Commission:</strong> {transaction.commission}</p>
            <p><strong>Transaction Date:</strong> {transaction.transactionDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
