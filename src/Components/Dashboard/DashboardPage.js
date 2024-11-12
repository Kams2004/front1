import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Body from './Body/Doctor-Body';
import Sidebar from './SideBar/DoctorSidebar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './DashboardPage.css';
import config from '../../config';

const DashboardPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard'); // Default to 'Dashboard'
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(true); // Assume profile is complete until checked

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Get doctor ID from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const doctorId = storedUser?.doctorId;

        if (!doctorId) {
          alert("Doctor ID is missing from local storage.");
          return;
        }

        // Fetch doctor's data
        const response = await axios.get(`${config.baseURL}doctor/informations/${doctorId}`, {
          withCredentials: true
        });

        const doctorData = response.data;
        const modifiedAt = new Date(doctorData.ModifiedAt);
        const currentDate = new Date();
        
        // Calculate if the ModifiedAt date is older than 5 months
        const fiveMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 5));

        // Set showProfileModal if profile needs to be updated
        if (modifiedAt < fiveMonthsAgo) {
          setShowProfileModal(true); // Show modal if profile is outdated
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        alert("Failed to fetch doctor data. Please try again.");
      }
    };

    fetchDoctorData();
  }, []);

  const handleSidebarItemClick = (component) => {
    if (isProfileComplete || component === 'Settings') {
      setSelectedComponent(component);
    } else {
      alert('Please complete your profile before navigating to other sections.');
    }
  };

  const handleUpdateNow = () => {
    setShowProfileModal(false);
    setSelectedComponent('Settings');
  };

  const handleProfileComplete = () => {
    setIsProfileComplete(true);
  };

  return (
    <div className="dashboard-page">
      <Header isProfileComplete={isProfileComplete} />
      <div className="main-content">
        <Sidebar onItemClick={handleSidebarItemClick} />

        <div className="dashboard-body">
          <Body 
            selectedComponent={selectedComponent} 
            onProfileComplete={handleProfileComplete} // Pass the function here
          />
        </div>
      </div>

      <Modal show={showProfileModal} onHide={handleUpdateNow}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We noticed this is your first time logging in after a long period. You must update your profile before proceeding.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateNow}>
            Update Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardPage;
