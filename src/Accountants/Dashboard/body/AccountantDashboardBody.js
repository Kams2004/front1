// src/Components/Accountant/Body/AccountantDashboardBody.js

import React, { useState, useEffect } from 'react';
import {
  AccountantTransactionsContainer,
  AccountantDoctorsContainer,
  AccountantPatientsContainer
} from './AccountantContainers';
import config from '../../../config';
import AccountantTransactionsList from '../AccountantTransactionsList';
import AccountantSettingsContainer from './Settings/AccountantSettingsContainer';
import AccountantReportsList from '../report/AccountantReportsList.';
import './AccountantDashboardBody.css';

const AccountantDashboardBody = ({ selectedComponent }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.baseURL}doctor`);
        const data = await response.json();
        setDoctors(data);

        if (data.length > 0) {
          setSelectedDoctorId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  return (
    <main className="accountant-dashboard-body">
      <div className="accountant-top-row">
        {selectedDoctorId && <AccountantTransactionsContainer doctorId={selectedDoctorId} />}
        <AccountantDoctorsContainer />
        {selectedDoctorId && <AccountantPatientsContainer doctorId={selectedDoctorId} />}
      </div>

      <div className="accountant-bottom-row">
        {selectedComponent === 'Transactions' && (
          <AccountantTransactionsList
            doctors={doctors}
            onDoctorSelect={handleDoctorSelect}
            selectedDoctorId={selectedDoctorId}
          />
        )}
        {selectedComponent === 'Reports' && <AccountantReportsList selectedReportType="summary" />}
        {selectedComponent === 'Settings' && <AccountantSettingsContainer />}
      </div>
    </main>
  );
};

export default AccountantDashboardBody;
