import React, { useState, useEffect, useRef } from "react";
import axios from '../../../axiosConfig';
import useAuthStore from '../../../authStore';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";
import config from '../../../config';
import { useTranslation } from 'react-i18next';

const Header = ({ isProfileComplete }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const languageRef = useRef(null); // Reference to detect clicks outside
  
  const { clearAuth } = useAuthStore();
  const { t, i18n } = useTranslation();
  const notificationCount = isProfileComplete ? 0 : 1;

  const handleLogout = async () => {
    try {
      await axios.post(`${config.baseURL}user/logout`);
      localStorage.clear();
      sessionStorage.clear();
      clearAuth();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setShowLanguageOptions(false); // Close dropdown after selecting a language
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="dashboard-header d-flex justify-content-between align-items-center p-3 shadow-sm">
      <div className="logo-container">
        <img src="pdmd.png" alt="PDMD Logo" className="dashboard-logo" />
      </div>

      <div className="d-flex form-control search-bar rounded-pill max-w">
        <i className="mr-5 bi bi-search"></i>
        <input
          type="text"
          className="border-0 ml-5 flex-grow-1"
          placeholder={t('search_placeholder')}
        />
      </div>

      <div className="icons-container d-flex align-items-center">
        {/* <div className="icon icon-spacing">
          <i className="bi bi-person-circle"></i>
        </div> */}

        <div
          className={`icon icon-spacing ${notificationCount > 0 ? "shake-icon" : ""}`} 
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
          style={{ position: 'relative' }}
        >
          <i className="bi bi-bell"></i>
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
          {showNotifications && notificationCount > 0 && (
            <div className="popover-container notification-popover">
              <div className="popover-content">
                <p>{t('update_profile')}</p>
              </div>
            </div>
          )}
        </div>

        <div
          className="icon icon-spacing"
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <i className="bi bi-chat-dots shake-icon"></i>
          {showMessages && (
            <div className="popover-container">
              <div className="popover-content">
                <p>{t('no_messages')}</p>
              </div>
            </div>
          )}
        </div>

        <div
          ref={languageRef} // Attach ref here for detecting outside clicks
          className="icon icon-spacing"
          onClick={() => setShowLanguageOptions(!showLanguageOptions)}
          style={{ position: 'relative' }}
        >
          <i className="bi bi-translate shake-icon"></i>
          {showLanguageOptions && (
            <div className="language-dropdown popover-container">
              <p onClick={() => changeLanguage("en")}>English</p>
              <p onClick={() => changeLanguage("fr")}>Français</p>
            </div>
          )}
        </div>

        <div className="icon icon-spacing" onClick={handleLogout} title="Logout">
          <i className="bi bi-box-arrow-right"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
