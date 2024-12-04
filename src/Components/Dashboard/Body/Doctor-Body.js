import React, { useEffect, useState } from "react";
import "./Doctor-Body.css";
import { FaWallet } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa";
import axios from 'axios';

import config from '../../../config';

import {
  TransactionsContainer,
  PatientsContainer,
  ExaminationsContainer,
  WideContainer,
  WeeklyRevenueContainer,
  StatusByChannelContainer,
} from "./containers";
import TransactionsList from "../Transaction/TransactionsList";
import RegisteredPatients from "../Patients/RegisteredPatients";
import ExaminationList from "../Examinations/ExaminationList";
import TransferToMedicalCenter from "../Transfer/TransferToMedicalCenter";
import SettingsContainer from "./Settings/SettingsContainer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userName, setUserName] = useState("User");
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [activeMobileComponent, setActiveMobileComponent] = useState("Dashboard"); // State to track mobile view components
  const [commission, setCommission] = useState(0.0); // Initialize with 0.0

  // Missing state variables
  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount state
  const [totalCommissions, setTotalCommissions] = useState(0); // Initialize totalCommissions state
  const [totalTransactions, setTotalTransactions] = useState(0); // Initialize totalTransactions state
  const [totalPatients, setTotalPatients] = useState(0); // Initialize totalPatients state
  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Fetch user details for the name
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      const firstName = storedUser.name.split(" ")[0];
      setUserName(firstName);
    }

    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;
  
        if (!doctorId) {
          console.error("Doctor ID is missing.");
          return;
        }
  
        // Fetch commission and patient data
        const response = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/research`);
        const data = response.data;
  
        // Set commission
        setCommission(data.commission);
  
        // Fetch patient data
        const patientsResponse = await axios.get(`${config.baseURL}gnu_doctor/${doctorId}/exams-patients`);
        const dataPatients = patientsResponse.data?.data_patients || [];
  
        // Calculate total amount, commissions, and transactions for the last month
        let amount = 0;
        let commissions = 0;
        let transactions = 0;
  
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
        dataPatients.forEach((patient) => {
          const [, details] = Object.entries(patient)[0];
          const patientDate = new Date(details[2]);
  
          if (patientDate >= startDate && patientDate <= endDate) {
            transactions += 1;
            commissions += 1;
            amount += parseFloat(details[1]);
          }
        });
  
        setTotalAmount(amount.toFixed(2).replace(/\.?0+$/, ""));
        setTotalCommissions(commissions);
        setTotalTransactions(transactions);
        setTotalPatients(dataPatients.length);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAmountVisibility = () => setIsAmountVisible(!isAmountVisible);

  const renderMobileContent = () => {
    switch (activeMobileComponent) {
      case "Patients":
        return <RegisteredPatients />;
      case "Settings":
        return <SettingsContainer onProfileComplete={onProfileComplete} />;
      default:
        return (
          <>
            <h2 className="mobile-welcome">{`Bienvenue, ${userName}`}</h2>
            <div className="mobile-containers">
              {/* Solde Principal */}
              <div className="mobile-container">
                <FaWallet className="mobile-icon" />
                <div className="mobile-text">
                  <h4>Solde principal</h4>
                  <div className="mobile-amount-wrapper">
                    <span className="mobile-amount">
                      {isAmountVisible ? `${commission.toLocaleString('en-US')} CFA` : "*****"}
                    </span>
                    <i
                      className={`bi ${isAmountVisible ? "bi-eye-slash" : "bi-eye"} mobile-eye-icon`}
                      onClick={toggleAmountVisibility}
                    ></i>
                  </div>
                </div>
              </div>
  
              {/* Patients Inscrits */}
              <div className="mobile-container">
                <FaUserInjured className="mobile-icon" />
                <div className="mobile-text">
                  <h4>Patients inscrits</h4>
                  <div className="mobile-amount-wrapper">
                    <span className="mobile-amount">{totalPatients}</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Transactions Mensuelles */}
            <div className="mobile-horizontal-container">
              <h3>Transactions Mensuelles</h3>
              <div className="mobile-transaction-item-container">
                <div className="mobile-transaction-item">
                  <h4>{`${totalAmount.toLocaleString('en-US')} CFA`}</h4>
                  <span>Montant</span>
                </div>
                <div className="mobile-transaction-item">
                  <h4>{totalCommissions}</h4>
                  <span>Commissions</span>
                </div>
                <div className="mobile-transaction-item">
                  <h4>{totalTransactions}</h4>
                  <span>Transactions</span>
                </div>
              </div>
            </div>
  
            {/* Divider Line */}
            <div className="mobile-horizontal-line"></div>
  
            {/* Weekly Revenue Chart */}
            <div className="mobile-weekly-revenue-wrapper">
              <div className="mobile-weekly-revenue-chart">
                <WeeklyRevenueContainer />
              </div>
            </div>
          </>
        );
    }
  };
  

  return isMobile ? (
    <div className="mobile-dashboard">
      {renderMobileContent()}
      <footer className="doctor-mobile-footer">
        <ul className="doctor-mobile-nav">
          <li onClick={() => setActiveMobileComponent("Dashboard")}>
            <i className="bi bi-house-door"></i>
          </li>
          <li onClick={() => setActiveMobileComponent("Patients")}>
            <i className="bi bi-person-lines-fill"></i>
          </li>
          <li onClick={() => setActiveMobileComponent("Settings")}>
            <i className="bi bi-gear"></i>
          </li>
        </ul>
      </footer>
    </div>
  ) : (
    <main className="dashboard">
      <div className="top-row">
        <TransactionsContainer />
        <PatientsContainer />
        <ExaminationsContainer />
      </div>
      <div className="bottom-row">
        {selectedComponent === "Transactions" ? (
          <TransactionsList />
        ) : selectedComponent === "Patients" ? (
          <RegisteredPatients />
        ) : selectedComponent === "Examinations" ? (
          <ExaminationList />
        ) : selectedComponent === "Transfer" ? (
          <TransferToMedicalCenter />
        ) : selectedComponent === "Settings" ? (
          <SettingsContainer onProfileComplete={onProfileComplete} />
        ) : (
          <>
            <WideContainer />
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
