import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pdmdLogo from "../pdmd.png"; // Replace with the correct path to your logo
import config from "../../../../config"; // Import configuration file for API base URL
import "./SendRequestPage.css";

const SendRequestPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const dataToSubmit = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(`${config.baseURL}requete/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setSuccessMessage("Votre demande a été envoyée avec succès !");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/"); // Redirect to home or desired page
        }, 3000);

        // Clear the form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Échec de l'envoi de la demande. Veuillez réessayer."
        );
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Erreur réseau. Veuillez réessayer plus tard.");
      setSuccessMessage("");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <div className="send-request-container">
      <div className="send-request-section">
        <img src={pdmdLogo} alt="Logo PDMD" className="send-request-logo" />
        <h2 className="send-request-title">Remplir le formulaire</h2>
        {successMessage && (
          <div className="send-request-success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="send-request-error-message">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="send-request-input-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="send-request-input-group">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="send-request-input-group">
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
          <div className="send-request-input-group">
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
          <div className="send-request-button-group">
            <button
              type="button"
              className="send-request-cancel-button"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="send-request-submit-button"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
      <div className="send-request-info-section">
        {/* Add additional information here if necessary */}
      </div>
    </div>
  );
};

export default SendRequestPage;
