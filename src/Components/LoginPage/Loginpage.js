import React, { useState } from 'react';
import EmailForm from './EmailForm';
import LoginForm from './LoginForm';
import SendRequestForm from './RequestForm';
import './LoginPage.css';

const LoginPage = () => {
    const [currentForm, setCurrentForm] = useState('email');

    const handleEmailReceived = () => {
        setCurrentForm('login');
    };

    const handleShowRequestFormFromEmail = () => {
        setCurrentForm('request');
    };

    const handleShowRequestFormFromLogin = () => {
        setCurrentForm('request');
    };

    const handleBackToEmail = () => {
        setCurrentForm('email');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="image-container">
                    <img src='/pdmd.png' alt="Medical Center" className="baby-image" />
                </div>
                <div className="form-container">
                    <img src='pdmd.png' alt="App Logo" className="app-logo" />
                    <h2>Welcome back!</h2>
                    {currentForm === 'email' && (
                        <EmailForm 
                            onEmailReceived={handleEmailReceived} 
                            onShowRequestForm={handleShowRequestFormFromEmail} 
                        />
                    )}
                    {currentForm === 'login' && (
                        <LoginForm 
                            onBack={handleBackToEmail} 
                            onShowRequestForm={handleShowRequestFormFromLogin} 
                            // Pass an optional prop to signal successful login
                            onLoginSuccess={() => setCurrentForm('')} 
                        />
                    )}
                    {currentForm === 'request' && (
                        <SendRequestForm 
                            onCancel={handleBackToEmail} 
                            redirectToEmailForm={handleBackToEmail} 
                        />
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
