import React, { useState, useEffect, useRef } from "react";
import axios from '../../../axiosConfig';
import useAuthStore from '../../../authStore';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";
import config from '../../../config';
import { useTranslation } from 'react-i18next';

const Header = ({ isProfileComplete }) => {
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar visibility
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const searchBarRef = useRef(null); // Reference to detect clicks outside the search bar
  const languageRef = useRef(null); // Reference to detect clicks outside the language dropdown

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

  // Close search bar or dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        showSearchBar
      ) {
        setShowSearchBar(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(event.target) &&
        showLanguageOptions
      ) {
        setShowLanguageOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchBar, showLanguageOptions]);

  return (
    <header className="dashboard-header d-flex justify-content-between align-items-center shadow-sm">
      {/* Logo */}
      <div className="logo-container d-flex align-items-center">
        <img src="pdmd.png" alt="PDMD Logo" className="dashboard-logo" />
      </div>

      {/* Icons */}
      <div className="icons-container d-flex align-items-center">
        <div className="icon" onClick={() => setShowSearchBar(!showSearchBar)}>
          <i className="bi bi-search"></i>
        </div>

        <div className="icon position-relative">
          <i className="bi bi-bell"></i>
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
        </div>

        <div
          className="icon"
          ref={languageRef}
          onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        >
          <i className="bi bi-translate"></i>
          {showLanguageOptions && (
            <div className="language-dropdown">
              <p onClick={() => changeLanguage("en")}>English</p>
              <p onClick={() => changeLanguage("fr")}>Français</p>
            </div>
          )}
        </div>

        <div className="icon" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </div>
      </div>

      {/* Search Bar */}
      {showSearchBar && (
        <div className="search-bar-wrapper" ref={searchBarRef}>
          <input
            type="text"
            className="search-bar"
            placeholder={t('search')}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
