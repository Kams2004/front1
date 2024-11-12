import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./PatientsHeader.css";

const PatientHeader = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Function to change the language and hide the dropdown
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language
    setShowLanguageOptions(false); // Hide the language options dropdown
  };

  return (
    <header className="patient-dashboard-header d-flex justify-content-between align-items-center p-3 shadow-sm">
      {/* PDMD Logo */}
      <div className="patient-logo-container">
        <img src="pdmd.png" alt="PDMD Logo" className="patient-dashboard-logo" />
      </div>
  
      {/* Search Bar - Centered */}
      <div className="d-flex form-control patient-search-bar rounded-pill patient-max-width">
        <i className="mr-5 bi bi-search patient-search-icon"></i>
        <input
          type="text"
          className="border-0 ml-5 flex-grow-1"
          placeholder={t("searchPlaceholder")} // Translated text
        />
      </div>
  
      {/* Icons on the right */}
      <div className="patient-icons-container d-flex align-items-center">
        {/* Account Icon */}
        <div className="patient-icon patient-icon-spacing mx-3">
          <i className="bi bi-person-circle"></i>
        </div>
  
        {/* Notification Icon */}
        <div
          className="patient-icon patient-icon-spacing mx-3"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <i className="bi bi-bell patient-shake-icon"></i>
          {showNotifications && (
            <div className="patient-popover-container">
              <div className="patient-popover-content">
                <p>{t("noNotifications")}</p> {/* Translated text */}
              </div>
            </div>
          )}
        </div>
  
        {/* Messaging Icon */}
        <div
          className="patient-icon patient-icon-spacing mx-3"
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <i className="bi bi-chat-dots patient-shake-icon"></i>
          {showMessages && (
            <div className="patient-popover-container">
              <div className="patient-popover-content">
                <p>{t("noMessages")}</p> {/* Translated text */}
              </div>
            </div>
          )}
        </div>
  
        {/* Language Icon */}
        <div
          className="patient-icon patient-icon-spacing mx-3 position-relative"
          onClick={() => setShowLanguageOptions(!showLanguageOptions)} // Toggle dropdown on click
        >
          <i className="bi bi-translate patient-shake-icon"></i>
          {showLanguageOptions && (
            <div className="patient-language-dropdown">
              <p onClick={() => changeLanguage("en")}>{t("english")}</p> {/* Translated text */}
              <p onClick={() => changeLanguage("fr")}>{t("french")}</p> {/* Translated text */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
  
};

export default PatientHeader;
