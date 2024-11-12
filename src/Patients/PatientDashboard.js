import React, { useState } from 'react';
import Header from './PatientsHeader';
import Body from './PatientBody';
import Sidebar from './PatientSideBar';
import './PatientSideBar.css';
import './PatientDashboard.css'; // Make sure to import your CSS file

const PatientDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard'); // Default to 'Dashboard'

  const handleSidebarItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="pd-dashboard-page">
      {/* Watermark */}
      <div className="pd-watermark"></div>

      {/* Full-width Header */}
      <Header className="pd-header" />

      {/* Main Content */}
      <div className="pd-main-content">
        {/* Sidebar */}
        <Sidebar onItemClick={handleSidebarItemClick} className="pd-sidebar-container" />
        
        {/* Body content */}
        <div className="pd-dashboard-body">
         <Body selectedComponent={selectedComponent} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
