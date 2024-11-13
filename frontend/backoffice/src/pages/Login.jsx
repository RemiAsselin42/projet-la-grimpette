import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../root.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:80/projet-la-grimpette/backend/php/login/connexion.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            utilisateur: username,
            mdp: password,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        onLogin();
      } else {
        setError(true);
        setTimeout(() => setError(false), 1000);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div id="page-login">
      <div className="background-image">
        <div className="overlay"></div>
      </div>
      <div className="login-container">
        <h2>La Grimpette</h2>
        <form onSubmit={handleSubmit} className={error ? "shake" : ""}>
          <div className="input-form">
            <p>Nom d`Utilisateur</p>
            <input
              type="text"
              value={username}
              placeholder="John Doe"
              className="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <p>Mot de Passe</p>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            id="btnConnexion"
            className={error ? "btnError" : "btnCorrect"}
          >
            <p>
              {error ? "Identifiant ou mot de passe incorrect " : "Connexion"}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
