// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './Components/LoginPage/components/LoginPage/LoginPage';
import DashboardPage from './Components/Dashboard/DashboardPage';
// import SignUpPage from './Components/SignUp/SignUpPage';
import DashboardPage1 from './ADMIN/Dashboard';
import PatientDashboard from './Patients/PatientDashboard';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountantDashboardPage from './Accountants/Dashboard/AccountantDashboardPage.js'; // Corrected import
import './axiosConfig';
import SendRequestPage from "./Components/LoginPage/components/SendRequestPage/SendRequestPage";
import ConnectionPage from "./Components/LoginPage/components/ConnectionPage/ConnectionPage";
import ConnectionPageAdmin from "./Components/LoginPage/Admin/components/ConnectionPageAdmin/ConnectionPageAdmin";
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/send-request" element={<SendRequestPage />} />
        <Route path="/connection" element={<ConnectionPage />} />   
        <Route path="/connection_Admin" element={<ConnectionPageAdmin />} />   
                    <Route path="/confirm/:token" element={<LoginPage />} /> {/* Confirmation Route */}
                    {/* <Route path="/signup" element={<SignUpPage />} /> */}
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute allowedRoles={['Admin']}>
                                <DashboardPage1 />
                            </ProtectedRoute>
                        } 
                    />
                 <Route 
  path="/doctor" 
  element={
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>

                    <Route 
                        path="/patient" 
                        element={
                            <ProtectedRoute allowedRoles={['Patient']}>
                                <PatientDashboard />
                            </ProtectedRoute>
                        } 
                    />

<Route
  path="/accountant"
  element={
    <ProtectedRoute allowedRoles={["Comptable"]}>
      <AccountantDashboardPage />
    </ProtectedRoute>
  }
/>


                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
