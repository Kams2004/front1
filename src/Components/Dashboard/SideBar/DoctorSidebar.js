import React, { useState, useEffect } from "react";
import "./DoctorSidebar.css";
import { useTranslation } from 'react-i18next';

const DoctorSidebar = ({ onItemClick }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
      });
    }

    if (window.innerWidth >= 473) {
      setIsExpanded(true);
    }

    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 473);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 473) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => setIsExpanded(false);

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`doctor-sidebar-containers ${isExpanded ? "doctor-expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="doctor-sidebar doctor-warp">
        <div className="doctor-user-container doctor-block">
          <div className="doctor-initials-profile">
            {getUserInitials(userData.name)}
          </div>
          {isExpanded && (
            <div className="doctor-user-info">
              <p className="doctor-welcome-text">{t("sidebar.welcome")}</p>
              <p>{userData.name}</p>
              <small>{userData.email}</small>
            </div>
          )}
        </div>

        <nav className="doctor-sidebar-nav">
          <ul>
            <li onClick={() => onItemClick("Dashboard")}>
              <i className="bi bi-house-door"></i>
              {isExpanded && <span>{t("sidebar.dashboard")}</span>}
            </li>
            <li onClick={() => onItemClick("Patients")}>
              <i className="bi bi-person-lines-fill"></i>
              {isExpanded && <span>{t("sidebar.registeredPatients")}</span>}
            </li>
            {/* <li onClick={() => onItemClick("Transactions")}>
              <i className="bi bi-file-earmark-text"></i>
              {isExpanded && <span>{t("sidebar.transactionList")}</span>}
            </li> */}
            {/* <li onClick={() => onItemClick("Examinations")}>
              <i className="bi bi-list-check"></i>
              {isExpanded && <span>{t("sidebar.examinationsList")}</span>}
            </li> */}
            <li onClick={() => onItemClick("Settings")}>
              <i className="bi bi-gear"></i>
              {isExpanded && <span>{t("sidebar.settings")}</span>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DoctorSidebar;
