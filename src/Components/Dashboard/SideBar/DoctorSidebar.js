import React, { useState, useEffect } from "react";
import "./DoctorSidebar.css";
import { useTranslation } from "react-i18next";

const DoctorSidebar = ({ onItemClick }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name,
        email: storedUser.email,
      });
    }

    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust breakpoint for mobile
      setIsMobileView(isMobile);
      setIsExpanded(!isMobile);
    };

    // Initial setup
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobileView) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileView) {
      setIsExpanded(false);
    }
  };

  const getUserInitials = (name) => {
    if (!name) return "U"; // Default if no name is provided
    const nameParts = name.split(" ").slice(0, 2); // Take the first two parts
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  const getFirstName = (name) => {
    if (!name) return t("sidebar.user"); // Default if no name is provided
    return name.split(" ")[0]; // Get the first name
  };

  return (
    <>
      {isMobileView ? (
        <footer className="doctor-mobile-footer">
          <ul className="doctor-mobile-nav">
            <li onClick={() => onItemClick("Dashboard")}>
              <i className="bi bi-house-door"></i>
            </li>
            <li onClick={() => onItemClick("Patients")}>
              <i className="bi bi-person-lines-fill"></i>
            </li>
            <li onClick={() => onItemClick("Settings")}>
              <i className="bi bi-gear"></i>
            </li>
          </ul>
        </footer>
      ) : (
        <div
          className={`doctor-sidebar-containers ${
            isExpanded ? "doctor-expanded" : "doctor-collapsed"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="doctor-sidebar doctor-warp">
            <div
              className={`doctor-user-container ${
                isExpanded ? "expanded" : "collapsed"
              }`}
            >
              <div className="doctor-initials-profile">
                {getUserInitials(userData.name)}
              </div>
              {isExpanded && (
                <div className="doctor-user-info">
                  <span>{t("sidebar.welcome")}</span>
                  <span>{getFirstName(userData.name)}</span>
                </div>
              )}
            </div>

            <nav className="doctor-sidebar-nav">
              <ul>
                <li onClick={() => onItemClick("Dashboard")}>
                  <i className="bi bi-house-door"></i>
                  {isExpanded && <span>{t("sidebar.dashboard")}</span>}
                </li>
                <li onClick={() => onItemClick("Patients")}>
                  <i className="bi bi-person-lines-fill"></i>
                  {isExpanded && <span>{t("sidebar.registeredPatients")}</span>}
                </li>
                <li onClick={() => onItemClick("Settings")}>
                  <i className="bi bi-gear"></i>
                  {isExpanded && <span>{t("sidebar.settings")}</span>}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorSidebar;
