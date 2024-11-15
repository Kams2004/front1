import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios"; // Import axios for API requests
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AdminHeader.css"; // Change the CSS file accordingly
import config from "../config";

const AdminHeader = () => {
  const { t, i18n } = useTranslation("admin"); // Use the 'admin' namespace for translations
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const navigate = useNavigate(); // Navigation hook for redirecting
  const [error, setError] = useState(""); // Error state

  // Function to change the language and hide the dropdown
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language
    setShowLanguageOptions(false); // Hide the language options dropdown
  };

  // Function to clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Send logout request to the API
      await axios.post(
        `${config.baseURL}user/logout`,
        {},
        {
          withCredentials: true, // Include credentials for cross-origin requests
        }
      );

      // Clear all authentication data from local storage
      localStorage.clear(); // Clears all local storage entries

      // Clear all cookies
      clearAllCookies();

      // Redirect the user to the login page
      navigate("/");
    } catch (error) {
      // Handle any errors that may occur during logout
      setError(t("logoutError")); // Set a translated error message
      console.error("Logout error:", error);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <header className="admin-dashboard-header d-flex justify-content-between align-items-center p-3 shadow-sm">
      {/* Admin Logo */}
      <div className="admin-logo-container">
        <img src="pdmd.png" alt="PDMD Logo" className="admin-dashboard-logo" />
      </div>

      {/* Search Bar - Centered */}
      <div className="d-flex form-control admin-search-bar rounded-pill admin-max-width">
        <i className="mr-5 bi bi-search admin-search-icon"></i>
        <input
          type="text"
          className="border-0 ml-5 admin-header-flex-grow"
          placeholder={t("search")} // Use the translated text from 'admin' namespace
        />
      </div>

      {/* Icons on the right */}
      <div className="admin-icons-container d-flex align-items-center">
        {/* Dashboard Icon */}
        <div className="admin-icon admin-icon-spacing mx-3">
          <i className="bi bi-speedometer2"></i>
        </div>

        {/* User Management Icon */}
        <div className="admin-icon admin-icon-spacing mx-3">
          <i className="bi bi-person-circle"></i>
        </div>

        {/* Notification Icon */}
        <div
          className="admin-icon admin-icon-spacing mx-3"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <i className="bi bi-bell admin-shake-icon"></i>
          {showNotifications && (
            <div className="admin-popover-container">
              <div className="admin-popover-content">
                <p>{t("noNotifications")}</p> {/* Use the translated text from 'admin' namespace */}
              </div>
            </div>
          )}
        </div>

        {/* Messaging Icon */}
        <div
          className="admin-icon admin-icon-spacing mx-3"
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <i className="bi bi-chat-dots admin-shake-icon"></i>
          {showMessages && (
            <div className="admin-popover-container">
              <div className="admin-popover-content">
                <p>{t("noMessages")}</p> {/* Use the translated text from 'admin' namespace */}
              </div>
            </div>
          )}
        </div>

        {/* Language Icon */}
        <div
          className="admin-icon admin-icon-spacing mx-3 position-relative"
          onClick={() => setShowLanguageOptions(!showLanguageOptions)} // Toggle dropdown on click
        >
          <i className="bi bi-translate admin-shake-icon"></i>
          {showLanguageOptions && (
            <div className="admin-language-dropdown">
              <p onClick={() => changeLanguage("en")}>{t("english")}</p> {/* Use the translated text from 'admin' namespace */}
              <p onClick={() => changeLanguage("fr")}>{t("french")}</p> {/* Use the translated text from 'admin' namespace */}
            </div>
          )}
        </div>

        {/* Logout Icon */}
        <div
          className="admin-icon admin-icon-spacing mx-3"
          onClick={handleLogout} // Logout function triggered on click
          title={t("logout")} // Tooltip with translated text
        >
          <i className="bi bi-box-arrow-right admin-shake-icon"></i>
        </div>
      </div>

      {/* Error message display */}
      {error && <div className="text-danger mt-2">{error}</div>}
    </header>
  );
};

export default AdminHeader;
