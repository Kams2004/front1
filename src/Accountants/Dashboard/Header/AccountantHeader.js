// src/Components/Accountant/AccountantHeader.js

import React, { useState, useRef, useEffect } from "react";
import axios from '../../../axiosConfig';
import useAuthStore from '../../../authStore';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AccountantHeader.css";
import config from '../../../config';
import { useTranslation } from 'react-i18next';

const AccountantHeader = () => {
  const { t, i18n } = useTranslation();
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const languageRef = useRef(null);

  const { clearAuth } = useAuthStore();

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

  // Detect outside click to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setShowLanguageOptions(false);
  };

  return (
    <header className="accountant-dashboard-header d-flex justify-content-between align-items-center p-3 shadow-sm">
      <div className="accountant-logo-container">
        <img src="pdmd.png" alt="PDMD Logo" className="accountant-dashboard-logo" />
      </div>

      <div className="d-flex form-control accountant-search-bar rounded-pill accountant-max-w">
        <i className="mr-5 bi bi-search"></i>
        <input
          type="text"
          className="border-0 ml-5 flex-grow-1"
          placeholder={t('header.searchPlaceholder')}
        />
      </div>

      <div className="accountant-icons-container d-flex align-items-center">
        {/* <div className="accountant-icon accountant-icon-spacing">
          <i className="bi bi-person-circle"></i>
        </div> */}

        <div
          className="accountant-icon accountant-icon-spacing"
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <i className="bi bi-chat-dots shake-icon"></i>
          {showMessages && (
            <div className="accountant-popover-container">
              <div className="accountant-popover-content">
                <p>{t('header.noMessages')}</p>
              </div>
            </div>
          )}
        </div>

        <div
          ref={languageRef}
          className="accountant-icon accountant-icon-spacing"
          onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        >
          <i className="bi bi-translate shake-icon"></i>
          <div className={`language-dropdown accountant-popover-container ${showLanguageOptions ? "" : "hidden"}`}>
            <p onClick={() => changeLanguage("en")}>{t('header.english')}</p>
            <p onClick={() => changeLanguage("fr")}>{t('header.french')}</p>
          </div>
        </div>

        <div className="accountant-icon accountant-icon-spacing" onClick={handleLogout} title="Logout">
          <i className="bi bi-box-arrow-right"></i>
        </div>
      </div>
    </header>
  );
};

export default AccountantHeader;
