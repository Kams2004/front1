import React, { useState } from 'react';
import './RequestForm.css';
import config from '../../config';

const RequestForm = ({ onCancel, onSubmit, redirectToEmailForm }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            message: formData.message,
        };

        try {
            const response = await fetch(`${config.baseURL}requete/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });
           
            if (response.ok) {
                setSuccessMessage('Request sent successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    redirectToEmailForm(); // Redirect to EmailForm page
                }, 2000);

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: '',
                });

                if (onSubmit) onSubmit(formData);
            } else {
                console.error('Failed to send request');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="request-form-container">
            <form className="request-form" onSubmit={handleSubmit}>
                <h2>Request Information</h2>

                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestForm;
