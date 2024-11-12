import React from 'react';
import './Doctor-Body.css'; // Import CSS specific to the body
import {
  TransactionsContainer,
  PatientsContainer,
  ExaminationsContainer,
  WideContainer,
  WeeklyRevenueContainer,
  StatusByChannelContainer,
} from './containers'; // Import containers

import TransactionsList from '../Transaction/TransactionsList'; // Import the Transactions List component
import RegisteredPatients from '../Patients/RegisteredPatients'; // Import the Registered Patients component
import ExaminationList from '../Examinations/ExaminationList'; // Import the Examination List component
import TransferToMedicalCenter from '../Transfer/TransferToMedicalCenter'; // Import the Transfer component
import SettingsContainer from './Settings/SettingsContainer'; // Import the Settings container
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Body = ({ selectedComponent, onProfileComplete }) => {
  const examinationsInProcess = 10;
  const totalExaminations = 20;
  const progressPercent = (examinationsInProcess / totalExaminations) * 100;

  const handleReload = () => {
    console.log('Reloading...');
  };

  return (
    <main className="dashboard">
      {/* Top Row */}
      <div className="top-row">
        <TransactionsContainer handleReload={handleReload} />
        <PatientsContainer handleReload={handleReload} />
        <ExaminationsContainer examinationsInProcess={examinationsInProcess} progressPercent={progressPercent} handleReload={handleReload} />
      </div>

      {/* Conditional rendering for the bottom row */}
      <div className="bottom-row">
        {selectedComponent === 'Transactions' ? (
          <TransactionsList />
        ) : selectedComponent === 'Patients' ? (
          <RegisteredPatients />
        ) : selectedComponent === 'Examinations' ? (
          <ExaminationList />
        ) : selectedComponent === 'Transfer' ? (
          <TransferToMedicalCenter />
        ) : selectedComponent === 'Settings' ? ( 
          <SettingsContainer onProfileComplete={onProfileComplete} /> // Pass the prop here
        ) : (
          <>
            <WideContainer handleReload={handleReload} />
            <div className="side-by-side">
              <WeeklyRevenueContainer />
              <StatusByChannelContainer />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Body;
