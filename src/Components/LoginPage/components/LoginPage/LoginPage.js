import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pdmdLogo from "../pdmd.png"; // Replace with the correct path to your logo
import config from "../../../../config"; // Replace with your actual configuration file path
import "./LoginPage.css"; // Import specific CSS for LoginPage

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleConnexion = () => {
    navigate("/connection");
  };

  const handleSendEmail = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${config.baseURL}users/send_email/`, {
        email,
      });

      if (response.data && response.data.Message) {
        setSuccessMessage(response.data.Message);
        setEmail(""); // Reset the email input
        setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      } else {
        setError("Adresse e-mail non enregistrée. Veuillez envoyer une demande de connexion.");
        setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.Message) {
        setError(err.response.data.Message);
      } else {
        setError("Échec de l'envoi de l'e-mail. Veuillez réessayer plus tard.");
      }
      setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-section">
        <img src={pdmdLogo} alt="Logo PDMD" className="login-page-logo" />
        <h2 className="login-page-title">Connectez-vous à votre compte</h2>
        <p className="login-page-signup-prompt">
          Vous n'avez pas de compte ?{" "}
          <a href="/send-request" className="login-page-signup-link">
            Inscrivez-vous
          </a>
        </p>
        <button className="login-page-btn google" onClick={handleConnexion}>
          Connexion
        </button>
        <div className="login-page-divider">
          <span>ou demandez votre nom d'utilisateur et votre mot de passe</span>
        </div>
        <form className="login-page-form" onSubmit={handleSendEmail}>
          {successMessage && (
            <p className="login-page-success-message">{successMessage}</p>
          )}
          {error && <p className="login-page-error-message">{error}</p>}
          <input
            type="email"
            placeholder="Adresse email"
            className="login-page-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="login-page-next-btn"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
      <div className="login-page-info-section">
        {/* Optional: Add more information here if needed */}
      </div>
    </div>
  );
};

export default LoginPage;
