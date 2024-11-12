import React, { useState } from 'react';
import UserManagement from './UserManagement'; // Import the user management component
import GroupManagement from './GroupManagement'; // Import the group management component
import DoctorManagement from './DoctorManagement'; // Import the doctor management component
import PatientManagement from './PatientManagement'; // Import the patient management component
import Sidebar from './Admin-SideBar'; // Import the sidebar component
import AdminSettingsContainer from './AdminSettingsContainer'; // Import the settings container
import './Admin-body.css'; // Import CSS specific to the body
import {
  SmallContainer1,
  SmallContainer2,
  SmallContainer3,
  SmallContainer4,
  SmallContainer5,
  SmallContainer6,
  LargeContainer1,
  LargeContainer2,
} from './containers'; // Import the newly defined containers

const Body = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Initialize to show dashboard first

  const renderLargeContainer = () => {
    switch (activeComponent) {
      case 'Doctors':
        return <DoctorManagement />; // Show Doctor Management if "Doctors" is active
      case 'Patients':
        return <PatientManagement />; // Show Patient Management if "Patients" is active
      default:
        return <LargeContainer1 />; // Default to LargeContainer1
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Users':
        return <UserManagement />;
      case 'Groups':
        return <GroupManagement />;
      case 'Settings': // Add this case for the settings container
        return <AdminSettingsContainer />;
      // Other cases for additional components
      default:
        return <LargeContainer2 />; // Render LargeContainer2 for default case
    }
  };

  return (
    <main className="dashboard">
      {/* Include the Sidebar and pass setActiveComponent */}
      <Sidebar onItemClick={setActiveComponent} />

      {/* Top Row with five small containers in the first line and the sixth one in the second line */}
      <div className="top-row">
        <SmallContainer1 className="small-container" />
        <SmallContainer2 className="small-container" />
        <SmallContainer3 className="small-container" />
        <SmallContainer4 className="small-container" />

        {/* Group SmallContainer5 and SmallContainer6 vertically */}
        <div className="container-group">
          <SmallContainer5 className="small-container-5" />
          <SmallContainer6 className="small-container-6" />
        </div>
      </div>

      {/* Bottom Row with the first large container and conditional rendering for the second */}
      <div className="bottom-row side-by-side">
        {renderLargeContainer()} {/* Render DoctorManagement or PatientManagement */}
        {renderComponent()} {/* Render the second large container based on active component */}
      </div>
    </main>
  );
};

export default Body;
