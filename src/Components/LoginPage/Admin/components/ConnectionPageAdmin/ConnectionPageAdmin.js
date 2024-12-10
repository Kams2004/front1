import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../../AuthContext";
import "./ConnectionPageAdmin.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import pdmdLogo from "../pdmd.png"; 
import config from "../../../../../config";

const ConnectionPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogout = async () => {
    try {
      await axios.post(`${config.baseURL}user/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    if (!username || !password || !role) {
      setError("Veuillez remplir tous les champs requis et sélectionner un rôle.");
      setTimeout(() => setError(""), 3000);
      setLoading(false);
      return;
    }
  
    try {
  
      await handleLogout();
  
      const response = await axios.post(`${config.baseURL}user/login`, {
        username,
        password,
        remember_me: rememberMe,
      });
  
      const responseData = response.data;
  
      if (response.status === 200) {
        const userRoles = responseData.data.roles.map((r) => r.name);
        const roleMapping = {
          Admin: "Admin",
          Accountant: "Comptable", 
        };
  
        if (userRoles.includes(roleMapping[role])) {

          login({ ...responseData.data, role: roleMapping[role] });
  
   
          navigate(`/${role.toLowerCase()}`);
        } else {
          setError("Le rôle choisi ne correspond pas à vos rôles assignés.");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.");
      } else {
        setError("Erreur réseau. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const isFormValid = username && password && role;

  return (
    <div className="connection-page-container">
      <div className="connection-page-login-section">
        <button className="connection-page-back-button" onClick={() => navigate("/")}>
          <AiOutlineArrowLeft className="connection-page-back-icon" />
        </button>

        <div className="connection-page-logo-container">
          <img src={pdmdLogo} alt="Logo PDMD" className="connection-page-logo" />
        </div>

        <h2 className="connection-page-login-title">Se connecter en tant que :</h2>

        {error && <p className="connection-page-text-danger">{error}</p>}

        <div className="connection-page-role-buttons">
          {["Admin", "Accountant"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`connection-page-role-button ${role === r ? "active" : ""}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="connection-page-login-form">
          <div className="connection-page-input-group">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="connection-page-input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-group-text border-0 bg-transparent eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </span>
          </div>

          <div className="connection-page-options">
            <label className="connection-page-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Se souvenir de moi
            </label>
            <button type="button" className="connection-page-forgot-password">
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            className={`connection-page-submit-button ${!isFormValid ? "disabled" : ""}`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>
      </div>
      <div className="connection-page-info-section" />
    </div>
  );
};

export default ConnectionPage;
