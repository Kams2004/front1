// src/Components/Accountant/Body/AccountantSettingsContainer.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import './AccountantSettingsContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountantSettingsContainer = () => {
  const { t } = useTranslation();

  const userData = {
    email: "ta2f@gmail.com",
    first_name: "Dr. FOTSO",
    last_name: "CHIMI SERGE",
    username: "gTnsUMcO",
  };

  const userImage = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`.toUpperCase();

  return (
    <div className="accountant-settings-container container py-4">
      <h2 className="text-center mb-3">{t("userSettings.title")}</h2>
      <div className="blue-line mb-4"></div>

      <div className="user-image-container d-flex justify-content-center mb-4">
        <div className="user-image d-flex align-items-center justify-content-center rounded-circle">
          {userImage}
        </div>
      </div>

      {/* Display user information */}
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label">{t("userSettings.firstName")}:</label>
            <input type="text" className="form-control rounded-pill" value={userData.first_name} readOnly />
          </div>
        </div>
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label">{t("userSettings.lastName")}:</label>
            <input type="text" className="form-control rounded-pill" value={userData.last_name} readOnly />
          </div>
        </div>
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label">{t("userSettings.username")}:</label>
            <input type="text" className="form-control rounded-pill" value={userData.username} readOnly />
          </div>
        </div>
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label">{t("userSettings.email")}:</label>
            <input type="text" className="form-control rounded-pill" value={userData.email} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantSettingsContainer;
