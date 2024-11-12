// src/Components/Accountant/AccountantSidebar.js
import React, { useState, useEffect } from "react";
import "./AccountantSidebar.css";

const AccountantSidebar = ({ onItemClick }) => {
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

  return (
    <div
      className={`accountant-sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* User Profile */}
      <div className="accountant-user-container">
        <img src="USER.jpeg" alt="User" className="accountant-user-profile" />
        {isExpanded && (
          <div className="accountant-user-info">
            <p>Hello, {userData.name}</p>
            <small>{userData.email}</small>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="accountant-sidebar-nav">
        <ul>
          <li onClick={() => onItemClick("Transactions")}>
            <i className="bi bi-file-earmark-text"></i>
            {isExpanded && <span>Transaction List</span>}
          </li>
          <li onClick={() => onItemClick("Reports")}>
            <i className="bi bi-graph-up"></i>
            {isExpanded && <span>Reports</span>}
          </li>
          <li onClick={() => onItemClick("Settings")}>
            <i className="bi bi-gear"></i>
            {isExpanded && <span>Settings</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountantSidebar;
