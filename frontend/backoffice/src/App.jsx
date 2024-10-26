import { useState, useEffect } from "react";
import Login from "./pages/Login";
import NavMenu from "./composant/nav-activites";
import "./root.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    window.location.href =
      "http://localhost:80/projet-la-grimpette/backend/php/deconnexion.php";
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "inscription":
        return {
          content: (
            <div className="inscription-content">
              <p>Contenu de la section Inscription</p>
            </div>
          ),
          className: "inscription-section",
        };
      case "activites":
        return {
          content: (
            <div>
              <NavMenu
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <p>Contenu de la section Activités</p>
              </div>
            </div>
          ),
          className: "activites-section activites",
        };
      case "activites-ajouter":
        return {
          content: (
            <div>
              <NavMenu
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <p>Contenu de la section Ajouter</p>
              </div>
            </div>
          ),
          className: "ajouter-section activites",
        };
      case "activites-modifier":
        return {
          content: (
            <div>
              <NavMenu
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <p>Contenu de la section Modifier</p>
              </div>
            </div>
          ),
          className: "modifier-section activites",
        };
      case "activites-supprimer":
        return {
          content: (
            <div>
              <NavMenu
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <p>Contenu de la section Supprimer</p>
              </div>
            </div>
          ),
          className: "supprimer-section activites",
        };
      default:
        return {
          content: (
            <div>
              <h2>Bienvenue sur le site Backoffice 👋</h2>
              <p>
                Ici vous pouvez gérer les inscriptions et les activités du club
                “La Grimpette”
              </p>
            </div>
          ),
          className: "home-section",
        };
    }
  };

  const { content, className } = renderContent();

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <header className="app-header">
            <h1>La Grimpette - CRM</h1>
          </header>
          <main>
            <div className="side-bar">
              <nav>
                <img
                  src="src/assets/logo-la-grimpette.png"
                  alt="logo"
                  className="logo"
                  onClick={() => setSelectedSection("home")}
                />

                <hr />

                <p onClick={() => setSelectedSection("inscription")}>
                  Inscription
                </p>

                <hr />

                <p
                  className="noBottomMargin"
                  onClick={() => setSelectedSection("activites")}
                >
                  Activités
                </p>
                <ul>
                  <li>
                    <p onClick={() => setSelectedSection("activites-ajouter")}>
                      Ajouter
                    </p>
                  </li>
                  <li>
                    <p onClick={() => setSelectedSection("activites-modifier")}>
                      Modifier
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => setSelectedSection("activites-supprimer")}
                    >
                      Supprimer
                    </p>
                  </li>
                </ul>

                <div className="deconnexion">
                  <hr />

                  <p onClick={handleLogout}>Déconnexion</p>
                </div>
              </nav>
            </div>
            <div className={`main-content ${className}`}>{content}</div>
          </main>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
