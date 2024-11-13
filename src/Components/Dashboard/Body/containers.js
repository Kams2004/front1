
import React, { useState, useEffect , useCallback } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next'; // Import translation hook
import config from '../../../config';


export const TransactionsContainer = ({ handleReload }) => {
  const { t } = useTranslation();
  const [isAmountVisible, setIsAmountVisible] = useState(true); // Show amount initially
  const [commission, setCommission] = useState(0.0); // Initialize with 0.0
  const [todayCommissionsCount, setTodayCommissionsCount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          alert(t("error.missingDoctorId"));
          return;
        }

        // Fetch commission and patient data
        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/research`);
        const data = response.data;

        // Set commission and count of `data_patients`
        setCommission(data.commission);
        setTodayCommissionsCount(data.data_patients.length);
      } catch (error) {
        console.error(t('error.fetchingTransactions'), error);
      }
    };

    fetchTransactions();
  }, [t]);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  return (
    <div className="container1 transactions-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h2 className="text-center">{t("transactions.title")}</h2>
      <div className="wallet-section d-flex align-items-center mt-4">
        <i className="bi bi-wallet2 wallet-icon"></i>
        <span className="amount ms-3 fw-bold">
          {isAmountVisible ? `${commission.toLocaleString('en-US')} FCFA` : "*****"}
        </span>
        <i 
          className={`bi ${isAmountVisible ? "bi-eye-slash" : "bi-eye"} ms-3 toggle-amount-icon`} 
          onClick={toggleAmountVisibility} 
          title={t("transactions.toggleAmount")}
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
          <span className="ms-2">{todayCommissionsCount} {t("transactions.commissions")}</span>
        </div>
        <div className="total-transactions d-flex align-items-center">
          <i className="bi bi-receipt"></i>
          <span className="ms-2">20 {t("transactions.totalTransactions")}</span>
        </div>
      </div>
    </div>
  );
};

export const PatientsContainer = ({ handleReload }) => {
  const { t } = useTranslation(); // Initialize translation
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          alert(t("error.missingDoctorId")); // Translated alert for missing doctor ID
          return;
        }

        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = response.data?.data_patients || [];
        const total = Object.keys(dataPatients).length;
        setTotalPatients(total);
      } catch (error) {
        console.error(t('error.fetchingPatientsData'), error); // Translated error message
      }
    };

    fetchPatients();
  }, [t]);

  const progressPercent = (totalPatients / 200) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="container1 patients-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h2 className="text-center mb-4">{t("patients.title")}</h2> {/* Translated title */}
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
          <i className="bi bi-person progress-icon-Patient"></i>
        </div>
        <div className="patients-info ms-3 text-center">
          <span className="patients-count fw-bold">{totalPatients}</span>
          <span className="ms-2">{t("patients.registeredPatients")}</span> {/* Translated label */}
        </div>
      </div>
    </div>
  );
};

export const ExaminationsContainer = ({ examinationsInProcess, progressPercent, handleReload }) => {
  const { t } = useTranslation(); // Initialize translation
  const circumference = 251.2;

  return (
    <div className="container1 examinations-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h2 className="text-center mb-4">{t("examinations.title")}</h2> {/* Translated title */}
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
          <i className="bi bi-activity progress-icon"></i>
        </div>
        <div className="examination-info ms-3">
          <span className="examination-count fw-bold">{examinationsInProcess}</span>
          <span className="ms-2">{t("examinations.label")}</span> {/* Translated label */}
        </div>
      </div>
    </div>
  );
};

export const WideContainer = ({ handleReload }) => {
  const { t } = useTranslation();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Stabilize fetchMonthlyTransactions with useCallback
  const fetchMonthlyTransactions = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const doctorId = storedUser?.doctorId;

      if (!doctorId) {
        console.error(t("error.missingDoctorId"));
        return;
      }

      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

      const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
      const dataPatients = response.data?.data_patients || [];

      let totalAmount = 0;
      let totalCommissions = 0;
      let totalTransactions = 0;

      dataPatients.forEach((patient) => {
        const [, details] = Object.entries(patient)[0];
        const patientDate = new Date(details[2]);

        if (patientDate >= startDate && patientDate <= endDate) {
          totalTransactions += 1;
          totalCommissions += 1;
          totalAmount += parseFloat(details[1]);
        }
      });

      setTotalAmount(totalAmount.toFixed(2).replace(/\.?0+$/, ''));
      setTotalCommissions(totalCommissions);
      setTotalTransactions(totalTransactions);

    } catch (error) {
      console.error(t('error.fetchingMonthlyTransactions'), error);
    }
  }, [t]); // Added dependency on `t` for translations

  useEffect(() => {
    fetchMonthlyTransactions();
  }, [fetchMonthlyTransactions]);

  return (
    <div className="wide-container p-4 shadow-sm position-relative">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={handleReload}></i>
      <h3 className="text-center mb-4">{t("wideContainer.title")}</h3>
      <div className="d-md-flex justify-content-between align-items-center">
        <div className="amount-section d-flex align-items-center">
          <i className="bi bi-wallet2 amount-icon"></i>
          <span className="ms-2 fw-bold">{totalAmount} CFA</span>
          <span className="ms-2">{t("wideContainer.amount")}</span>
        </div>
        <div className="commission-section d-flex align-items-center">
          <i className="bi bi-cash-coin commission-icon"></i>
          <span className="ms-2 fw-bold">{totalCommissions}</span>
          <span className="ms-2">{t("wideContainer.commissions")}</span>
        </div>
        <div className="transactions-section d-flex align-items-center">
          <i className="bi bi-receipt transactions-icon"></i>
          <span className="ms-2 fw-bold">{totalTransactions}</span>
          <span className="ms-2">{t("wideContainer.transactions")}</span>
        </div>
      </div>
    </div>
  );
};

export const WeeklyRevenueContainer = () => {
  const { t } = useTranslation(); // Initialize translation hook

  const [weeklyRevenueData, setWeeklyRevenueData] = useState({
    labels: [t('weeklyRevenue.mon'), t('weeklyRevenue.tue'), t('weeklyRevenue.wed'), t('weeklyRevenue.thu'), t('weeklyRevenue.fri'), t('weeklyRevenue.sat'), t('weeklyRevenue.sun')],
    datasets: [{
      label: t('weeklyRevenue.label'), // Translated label
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
          console.error(t('error.missingDoctorId')); // Translation for missing ID error
          return;
        }

        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = response.data?.data_patients || [];

        const revenueByDay = [0, 0, 0, 0, 0, 0, 0];

        dataPatients.forEach((patient) => {
          const [, details] = Object.entries(patient)[0];
          const patientDate = new Date(details[2]);
          const dayOfWeek = patientDate.getDay();

          revenueByDay[dayOfWeek] += parseFloat(details[1]);
        });

        setWeeklyRevenueData((prevState) => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: revenueByDay,
          }]
        }));
      } catch (error) {
        console.error(t('error.fetchingWeeklyRevenue'), error); // Translated error message
      }
    };

    fetchWeeklyRevenue();
  }, [t]);

  return (
    <div className="container1 weekly-revenue-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={() => console.log(t('actions.reloading'))}></i>
      <h3 className="text-center mb-4">{t('weeklyRevenue.title')}</h3>
      <Line data={weeklyRevenueData} />
    </div>
  );
};

export const StatusByChannelContainer = () => {
  const { t } = useTranslation(); // Initialize translation hook

  const statusByChannelData = {
    labels: [t('channels.direct'), t('channels.socialMedia'), t('channels.searchEngine'), t('channels.referral')],
    datasets: [{
      label: t('channels.label'), // Translated label
      data: [40, 25, 20, 15],
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
    }]
  };

  return (
    <div className="container1 status-by-channel-container">
      <i className="bi bi-arrow-clockwise reload-icon" onClick={() => console.log(t('actions.reloading'))}></i>
      <h3 className="text-center mb-4">{t('channels.title')}</h3>
      <Bar data={statusByChannelData} />
    </div>
  );
};
