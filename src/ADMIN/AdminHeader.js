import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminHeader.css"; // Updated CSS file
import config from "../config";

const AdminHeader = () => {
  const { t, i18n } = useTranslation("admin");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageOptions(false);
  };

  const clearAllCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${config.baseURL}user/logout`, {}, { withCredentials: true });
      localStorage.clear();
      clearAllCookies();
      navigate("/");
    } catch (error) {
      setError(t("logoutError Please delete Your cache data"));
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000); 
    }
  };

  return (
    <header className="admin-dashboard-header d-flex justify-content-between align-items-center p-3 shadow-sm">
      <div className="admin-logo-container">
        <img src="pdmd.png" alt="PDMD Logo" className="admin-dashboard-logo" />
      </div>

      <div className="d-flex form-control admin-search-bar rounded-pill admin-max-width">
        <i className="mr-5 bi bi-search admin-search-icon"></i>
        <input
          type="text"
          className="border-0 ml-5 admin-header-flex-grow"
          placeholder={t("search")}
        />
      </div>

      <div className="admin-icons-container d-flex align-items-center">
        <div
          className="admin-icon admin-icon-spacing mx-3"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <i className="bi bi-bell admin-shake-icon"></i>
          {showNotifications && (
            <div className="admin-popover-container">
              <div className="admin-popover-content">
                <p>{t("noNotifications")}</p>
              </div>
            </div>
          )}
        </div>

        <div
          className="admin-icon admin-icon-spacing mx-3"
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <i className="bi bi-chat-dots admin-shake-icon"></i>
          {showMessages && (
            <div className="admin-popover-container">
              <div className="admin-popover-content">
                <p>{t("noMessages")}</p>
              </div>
            </div>
          )}
        </div>

        <div
          className="admin-icon admin-icon-spacing mx-3 position-relative"
          onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        >
          <i className="bi bi-translate admin-shake-icon"></i>
          {showLanguageOptions && (
            <div className="admin-language-dropdown">
              <p onClick={() => changeLanguage("en")}>{t("english")}</p>
              <p onClick={() => changeLanguage("fr")}>{t("french")}</p>
            </div>
          )}
        </div>

        <div
          className="admin-icon admin-icon-spacing mx-3"
          onClick={handleLogout}
          title={t("logout")}
        >
          <i className="bi bi-box-arrow-right admin-shake-icon"></i>
        </div>
      </div>

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <p>{error}</p>
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
