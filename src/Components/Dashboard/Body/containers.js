
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import config from '../../../config';

export const TransactionsContainer = ({ handleReload }) => {
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [commission, setCommission] = useState('*****');
  const [todayCommissionsCount, setTodayCommissionsCount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          alert("Doctor ID is missing from local storage.");
          return;
        }

        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const data = response.data;

        const formattedCommission = parseInt(data.commission).toLocaleString('en-US');
        setCommission(formattedCommission);

        const todayDate = new Date().toISOString().split('T')[0];
        const commissionsToday = Object.values(data.data_patients).filter((transaction) => {
          const transactionDate = new Date(transaction[2]).toISOString().split('T')[0];
          return transactionDate === todayDate;
        }).length;

        setTodayCommissionsCount(commissionsToday);
      } catch (error) {
        console.error('Error fetching transactions data:', error);
      }
    };

    fetchTransactions();
  }, []);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  return (
    <div className="container1 transactions-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h2 className="text-center">Today's Transactions</h2>
      <div className="wallet-section d-flex align-items-center mt-4">
        <i className="bi bi-wallet2 wallet-icon"></i>
        <span className="amount ms-3 fw-bold">
          {isAmountVisible ? `${commission} FCFA` : "*****"}
        </span>
        <i 
          className={`bi ${isAmountVisible ? "bi-eye-slash" : "bi-eye"} ms-3 toggle-amount-icon`} 
          onClick={toggleAmountVisibility} 
          title="Toggle Amount Visibility"
        ></i>
      </div>
      <div className="progress mt-4">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: '50%' }}
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="transaction-info d-flex justify-content-between mt-4">
        <div className="commission d-flex align-items-center">
          <i className="bi bi-cash-coin"></i>
          <span className="ms-2">{todayCommissionsCount} Commissions</span>
        </div>
        <div className="total-transactions d-flex align-items-center">
          <i className="bi bi-receipt"></i>
          <span className="ms-2">20 Transactions</span>
        </div>
      </div>
    </div>
  );
};

export const PatientsContainer = ({ handleReload }) => {
  const [totalPatients, setTotalPatients] = useState(0); // Total number of patients
  // const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Retrieve doctor ID from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          alert("Doctor ID is missing from local storage.");
          return;
        }

        // Fetch patients data based on doctor ID
        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = response.data?.data_patients || [];

        // Calculate total number of patients
        const total = Object.keys(dataPatients).length; // Counting keys (patient names)

        setTotalPatients(total); // Set the total patients count
        // setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching patients data:', error);
        // setLoading(false); // Stop loading in case of an error
      }
    };

    fetchPatients();
  }, []); // Fetch patients when the container is mounted

  // Calculate progress as a percentage of total patients (assuming default total patients is 200)
  const progressPercent = (totalPatients / 200) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  return (
    <div className="container1 patients-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h2 className="text-center mb-4">Registered Patients</h2>
      {/* {loading ? (
        <div className="loader">Loading...</div> // Display loader while data is being fetched
      ) : ( */}
        <div className="progress-row d-flex align-items-center justify-content-center">
          <div className="progress-circle-Patient">
            <svg className="progress-svg" viewBox="0 0 100 100">
              <circle className="progress-bg" cx="50" cy="50" r="40" />
              <circle
                className="progress-bar-Patient"
                cx="50"
                cy="50"
                r="40"
                style={{
                  strokeDashoffset: `${circumference - (circumference * progressPercent) / 100}px`,
                }}
              />
            </svg>
            <i className="bi bi-person progress-icon-Patient"></i> {/* Icon placed directly inside the container */}
          </div>
          <div className="patients-info ms-3 text-center">
            <span className="patients-count fw-bold">{totalPatients}</span>
            <span className="ms-2">Registered Patients</span>
          </div>
        </div>
    
    </div>
  );
};

export const ExaminationsContainer = ({ examinationsInProcess, progressPercent, handleReload }) => {
    const circumference = 251.2; // Circle circumference (2 * π * r)
  
    return (
      <div className="container1 examinations-container">
        <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
        <h2 className="text-center mb-4">Examinations In Process</h2>
        <div className="progress-row d-flex align-items-center justify-content-center">
          <div className="progress-circle">
            <svg className="progress-svg" viewBox="0 0 100 100">
              <circle className="progress-bg" cx="50" cy="50" r="40" />
              <circle
                className="progress-bar"
                cx="50"
                cy="50"
                r="40"
                style={{ strokeDashoffset: `${circumference - (circumference * progressPercent) / 100}px` }}
              />
            </svg>
            <i className="bi bi-activity progress-icon"></i> {/* Icon placed directly inside the container */}
          </div>
          <div className="examination-info ms-3">
            <span className="examination-count fw-bold">{examinationsInProcess}</span>
            <span className="ms-2">Examinations</span>
          </div>
        </div>
      </div>
    );
  };
  export const WideContainer = ({ handleReload }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalCommissions, setTotalCommissions] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);

  
    // Fetch data when the container loads
    const fetchMonthlyTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const doctorId = storedUser?.doctorId;
  
        if (!doctorId) {
          console.error('Doctor ID is missing from local storage.');
          return;
        }
  
        // Get the current date and calculate the start and end of the previous month
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
        // Fetch patient data
        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = response.data?.data_patients || [];
  
        let totalAmount = 0;
        let totalCommissions = 0;
        let totalTransactions = 0;
  
        // Filter the patients by the recent month and calculate totals
        dataPatients.forEach((patient) => {
          const [, details] = Object.entries(patient)[0];  // Get patient transaction details
          const patientDate = new Date(details[2]); // Convert the transaction date to Date object
  
          // Check if the patient's transaction date is in the recent month
          if (patientDate >= startDate && patientDate <= endDate) {
            totalTransactions += 1;
            totalCommissions += 1;
            totalAmount += parseFloat(details[1]); // Add the commission amount
          }
        });
  
        // Set the state with calculated values
        setTotalAmount(totalAmount.toFixed(2).replace(/\.?0+$/, '')); // Remove trailing zeros from total amount
        setTotalCommissions(totalCommissions);
        setTotalTransactions(totalTransactions);
   
      } catch (error) {
        console.error('Error fetching monthly transactions:', error);

      }
    };
  
    useEffect(() => {
      fetchMonthlyTransactions();
    }, []);
  
    return (
      <div className="wide-container p-4 shadow-sm position-relative">
        <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
        <h3 className="text-center mb-4">Monthly Transactions</h3>
        <div className="d-md-flex justify-content-between align-items-center">
          <div className="amount-section d-flex align-items-center">
            <i className="bi bi-wallet2 amount-icon"></i>
            <span className="ms-2 fw-bold">{totalAmount} CFA</span>
            <span className="ms-2">Amount</span>
          </div>
          <div className="commission-section d-flex align-items-center">
            <i className="bi bi-cash-coin commission-icon"></i>
            <span className="ms-2 fw-bold">{totalCommissions}</span>
            <span className="ms-2">Commissions</span>
          </div>
          <div className="transactions-section d-flex align-items-center">
            <i className="bi bi-receipt transactions-icon"></i>
            <span className="ms-2 fw-bold">{totalTransactions}</span>
            <span className="ms-2">Transactions</span>
          </div>
        </div>
      </div>
    );
};



export const WeeklyRevenueContainer = () => {
  const [weeklyRevenueData, setWeeklyRevenueData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue',
      data: [0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      borderWidth: 2,
      fill: true,
    }]
  });

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          console.error('Doctor ID is missing from local storage.');
          return;
        }

        // Fetch patient data
        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = response.data?.data_patients || [];

        // Initialize an array to store revenue for each day of the week (Mon-Sun)
        const revenueByDay = [0, 0, 0, 0, 0, 0, 0]; // Initialize all days with 0 revenue

        dataPatients.forEach((patient) => {
          const [, details] = Object.entries(patient)[0];  // Get patient transaction details
          const patientDate = new Date(details[2]); // Convert the transaction date to Date object

          // Get the day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
          const dayOfWeek = patientDate.getDay(); 

          // Add the patient's commission to the corresponding day
          revenueByDay[dayOfWeek] += parseFloat(details[1]);
        });

        // Update the chart data
        setWeeklyRevenueData((prevState) => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: revenueByDay,  // Set the revenue data for each day of the week
          }]
        }));
      } catch (error) {
        console.error('Error fetching weekly revenue data:', error);
      }
    };

    fetchWeeklyRevenue();
  }, []); // Runs only once when the component mounts

  return (
    <div className="container1 weekly-revenue-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={() => console.log('Reloading...')}></i>
      <h3 className="text-center mb-4">Weekly Revenue</h3>
      <Line data={weeklyRevenueData} />
    </div>
  );
};


// Example of StatusByChannelContainer Component
export const StatusByChannelContainer = () => {
  // Data for Status by Channel
  const statusByChannelData = {
    labels: ['Direct', 'Social Media', 'Search Engine', 'Referral'],
    datasets: [{
      label: 'Channels',
      data: [40, 25, 20, 15],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
    }]
  };

  return (
    <div className="container1 status-by-channel-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={() => console.log('Reloading...')}></i>
      <h3 className="text-center mb-4">Status by Channel</h3>
      <Bar data={statusByChannelData} />
    </div>
  );
};