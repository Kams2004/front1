import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './LoginPage.css'; // Reuse existing CSS

const EmailForm = ({ onEmailReceived, onShowRequestForm }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSendRequest = async () => {
        setError(''); // Clear any previous errors
        setSuccessMessage(''); // Clear any previous success message
        setLoading(true); // Set loading to true
        
        try {
            const response = await axios.post(`${config.baseURL}users/send_email/`, { email });

            // Check if the API returns a message, and it's a successful response
            if (response.data && response.data.Message) {
                setSuccessMessage(response.data.Message); // Display the success message from API
                setEmail(''); // Optionally reset the email field

                // Set timeout to hide the success message after 5 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000);
            } else {
                setError('Email not registered. Please send a connection request.');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.Message) {
                setError(err.response.data.Message); // Show the error message from the API
            } else {
                setError('Failed to send email. Please try again later.');
            }
            console.error('Email send error:', err);

            // Set timeout to hide the error message after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
        } finally {
            setLoading(false); // Reset loading state after request is completed
        }
    };

    return (
        <div className="form-container">
            {successMessage && <p className="text-success">{successMessage}</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="input-group mb-3 rounded-pill border">
                <span className="input-group-text border-0 bg-transparent">
                    <i className="bi bi-envelope"></i>
                </span>
                <input
                    type="email"
                    className="form-control border-0 rounded-pill"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="d-flex justify-content-between mb-3">
                <span style={{ marginRight: '20px' }}>
                    connection <button
                        className="link-button"
                        onClick={onShowRequestForm} // Trigger showing the send request form
                        disabled={loading} // Disable button while loading
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0',
                            color: loading ? '#aaa' : '#007bff',
                            textDecoration: loading ? 'none' : 'underline',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'color 0.3s'
                        }}
                    >
                        request ?
                    </button>
                </span>
                <span>
                    Identifiers <button
                        className="link-button"
                        onClick={onEmailReceived} // Switch to login form
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0',
                            color: '#007bff',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            transition: 'color 0.3s'
                        }}
                    >
                        received !
                    </button>
                </span>
            </div>

            <button className="submit-button" onClick={handleSendRequest} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default EmailForm;
