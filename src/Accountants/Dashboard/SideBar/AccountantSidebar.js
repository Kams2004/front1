// src/Components/Accountant/AccountantSidebar.js

import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./AccountantSidebar.css";

const AccountantSidebar = ({ onItemClick }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
      });
    }

    setIsExpanded(window.innerWidth >= 473);
    const handleResize = () => setIsExpanded(window.innerWidth >= 473);
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
    if (!name) return "U"; // Return 'U' as default if no name is provided
  
    return name
      .split(" ")
      .slice(0, 2) // Take the first two parts of the name
      .map(part => part[0].toUpperCase()) // Get the first letter of each part
      .join(""); // Join them together
  };
  
  const userInitials = getUserInitials(userData.name);

  return (
    <div
      className={`accountant-sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     <div className="accountant-user-container">
  <div className="accountant-user-initials">
    {userInitials}
  </div>
  {isExpanded && (
    <div className="accountant-user-info">
      <p>{t('sidebar.helloUser')}, {userData.name || 'User'}</p>
      <small>{userData.email || 'No Email'}</small>
    </div>
  )}
</div>

      <div className="accountant-sidebar-nav">
        <ul>
          <li onClick={() => onItemClick("Transactions")}>
            <i className="bi bi-file-earmark-text"></i>
            {isExpanded && <span>{t('sidebar.transactionList')}</span>}
          </li>
          <li onClick={() => onItemClick("Reports")}>
            <i className="bi bi-graph-up"></i>
            {isExpanded && <span>{t('sidebar.reports')}</span>}
          </li>
          <li onClick={() => onItemClick("Settings")}>
            <i className="bi bi-gear"></i>
            {isExpanded && <span>{t('sidebar.settings')}</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountantSidebar;
