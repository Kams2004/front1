import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import config from '../../config';

const LoginForm = ({ onBack, onShowRequestForm, onLoginSuccess }) => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember_me, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!role) {
            setError('Please select a role before logging in.');
            return;
        }

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post(
                `${config.baseURL}user/login`,
                { username, password, remember_me },
                { withCredentials: true }
            );

            const responseData = response.data;

            if (response.status === 200) {
                const accessToken = responseData['Token '];
                const userRoles = responseData.data.roles ? responseData.data.roles.map(role => role.name) : [];
                const sessionId = responseData.sessionId;
                const doctorId = responseData.data.doctor_id;
                const firstName = responseData.data.first_name;
                const lastName = responseData.data.last_name;
                const email = responseData.data.email;

                if (accessToken && userRoles.includes(role)) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('doctorId', doctorId);
                    localStorage.setItem('firstName', firstName);
                    localStorage.setItem('lastName', lastName);
                    localStorage.setItem('email', email);

                    if (sessionId) {
                        localStorage.setItem('sessionId', sessionId);
                    }

                    login({ accessToken, role, sessionId, doctorId, firstName, lastName, email });

                    if (role === 'Admin') {
                        navigate('/admin');
                    } else if (role === 'Doctor') {
                        navigate('/doctor');
                    } else if (role === 'Patient') {
                        navigate('/patient');
                    } else if (role === 'Comptable') {  // Corrected to match "Comptable" from API
                        navigate('/accountant');
                    } else {
                        setError('Role not recognized. Please contact support.');
                    }

                    // Signal successful login to LoginPage component
                    onLoginSuccess && onLoginSuccess();
                } else {
                    setError('Connection Role does not correspond. Select the appropriate role!');
                }
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Login failed. Please check your credentials and try again.');
            } else {
                setError('Network error. Please try again later.');
            }
            console.error('Login error:', err);
        }
    };

    return (
        <div className="form-container">
            {error && <p className="text-danger">{error}</p>}

            <button
                className="back-button"
                onClick={onBack}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '20px'
                }}
            >
                <i className="bi bi-arrow-left"></i>
            </button>

            <p>Login as:</p>
            <div className="role-buttons">
                <button
                    onClick={() => setRole('Doctor')}
                    className={`role-button ${role === 'Doctor' ? 'active' : ''}`}
                >
                    Doctor
                </button>
                <button
                    onClick={() => setRole('Patient')}
                    className={`role-button ${role === 'Patient' ? 'active' : ''}`}
                >
                    Patient
                </button>
                <button
                    onClick={() => setRole('Admin')}
                    className={`role-button ${role === 'Admin' ? 'active' : ''}`}
                >
                    Admin
                </button>
                <button
    onClick={() => setRole('Comptable')} // Correct role to match API response
    className={`role-button ${role === 'Comptable' ? 'active' : ''}`}
>
    Accountant
</button>

            </div>

            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group mb-3 rounded-pill border">
                    <span className="input-group-text border-0 bg-transparent">
                        <i className="bi bi-person"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-0 rounded-pill"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group mb-3 rounded-pill border">
                    <span className="input-group-text border-0 bg-transparent">
                        <i className="bi bi-lock"></i>
                    </span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-0 rounded-pill"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="input-group-text border-0 bg-transparent eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </span>
                </div>

                <div className="options d-flex justify-content-between align-items-center">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={remember_me}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <button type="button" className="forgot-password" onClick={onShowRequestForm}>
                        Forgot password?
                    </button>
                </div>

                <button type="submit" className="submit-button">Confirm</button>
            </form>
        </div>
    );
};

export default LoginForm;
