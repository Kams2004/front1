import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../AuthContext"; // Importer AuthContext pour l'authentification
import "./ConnectionPage.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import pdmdLogo from "../pdmd.png"; // Importer le logo PDMD
import config from "../../../../config"; // Importer le fichier de configuration

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!role) {
      setError('Veuillez sélectionner un rôle avant de vous connecter.');
      setLoading(false);
      return;
    }

    if (!username || !password) {
      setError('Veuillez remplir tous les champs.');
      setLoading(false);
      return;
    }

    try {
      // Déconnexion avant une nouvelle connexion pour garantir qu'aucune session existante n'est active
      await axios.post(`${config.baseURL}user/logout`, {}, { withCredentials: true });

      // Envoyer la requête de connexion
      const response = await axios.post(
        `${config.baseURL}user/login`,
        { username, password, remember_me: rememberMe },
        { withCredentials: true }
      );

      const responseData = response.data;

      if (response.status === 200) {
        const accessToken = responseData['Token '];
        const userRoles = responseData.data.roles.map((r) => r.name);
        const doctorId = responseData.data.doctor_id;
        const firstName = responseData.data.first_name;
        const lastName = responseData.data.last_name;
        const email = responseData.data.email;

        const roleMapping = {
          Médecin: "Doctor",
          Patient: "Patient",
        };

        if (accessToken && userRoles.includes(roleMapping[role])) {
          const mappedRole = roleMapping[role];

          // Enregistrer les données de l'utilisateur dans le localStorage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('userRole', mappedRole);
          localStorage.setItem('doctorId', doctorId || null);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('email', email);

          // Mettre à jour AuthContext
          login({ accessToken, role: mappedRole, doctorId, firstName, lastName, email });

          // Naviguer vers le tableau de bord correspondant
          if (mappedRole === "Doctor") {
            navigate('/doctor');
          } else if (mappedRole === "Patient") {
            navigate('/patient');
          }
        } else {
          setError('Le rôle sélectionné ne correspond pas à vos rôles attribués.');
          setTimeout(() => setError(''), 3000);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.");
      } else {
        setError("Erreur réseau. Veuillez réessayer plus tard.");
      }
      console.error('Erreur de connexion :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const isFormValid = username && password && role;

  return (
    <div className="connection-page-container">
      <div className="connection-page-login-section">
        <button className="connection-page-back-button" onClick={handleBack}>
          <AiOutlineArrowLeft className="connection-page-back-icon" />
        </button>

        <div className="connection-page-logo-container">
          <img src={pdmdLogo} alt="Logo PDMD" className="connection-page-logo" />
        </div>

        <h2 className="connection-page-login-title">Connectez-vous en tant que :</h2>

        {error && <p className="connection-page-text-danger">{error}</p>}

        <div className="connection-page-role-buttons">
          {["Médecin", "Patient"].map((r) => (
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
            className={`connection-page-submit-button ${isFormValid ? "" : "disabled"}`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>

      <div className="connection-page-info-section" />
    </div>
  );
};

export default ConnectionPage;
