import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation for localization
import "./PatientSideBar.css";

const PatientSideBar = ({ onItemClick }) => {
  const { t } = useTranslation(); // Get translation function
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 473);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <div
      className={`sidebar-containers ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar">
        {/* User Info Section */}
        <div className="user-container">
          <img src="USER.jpeg" alt="User" className="user-profile" />
          {isExpanded && (
            <div className="user-info">
              <p>{t('userGreeting', { name: 'William' })}</p> {/* Example with dynamic name */}
              <small>william@gmail.com</small>
            </div>
          )}
        </div>
        
        {/* Navigation Section */}
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => handleItemClick("Home")}>
              <i className="bi bi-house-door-fill"></i>
              {isExpanded && <span>{t('home')}</span>}
            </li>
            <li onClick={() => handleItemClick("Laboratory Tests")}>
              <i className="bi bi-lungs"></i>
              {isExpanded && <span>{t('labTests')}</span>}
            </li>
            <li onClick={() => handleItemClick("Imagerie")}>
              <i className="bi bi-file-earmark-image"></i>
              {isExpanded && <span>{t('imagery')}</span>}
            </li>
            <li onClick={() => handleItemClick("Exploration Functionnelle")}>
              <i className="bi bi-activity"></i>
              {isExpanded && <span>{t('functionalExploration')}</span>}
            </li>
            <li onClick={() => handleItemClick("Requests")}>
              <i className="bi bi-file-earmark-text"></i>
              {isExpanded && <span>{t('requests')}</span>}
            </li>
            <li onClick={() => handleItemClick("Settings")}>
              <i className="bi bi-gear-fill"></i>
              {isExpanded && <span>{t('settings')}</span>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PatientSideBar;
