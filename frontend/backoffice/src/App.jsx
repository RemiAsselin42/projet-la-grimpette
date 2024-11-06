import { useState, useEffect } from "react";
import Login from "./pages/Login";
import NavActivite from "./composant/nav-activites";
import Navinscriptions from "./composant/nav-inscriptions";

import SectionActivites from "./sections/section-activites";
import SectionActivitesAjouter from "./sections/section-activites-ajouter";
import SectionInscriptions from "./sections/section-inscriptions";
import SectionInscriptionsValidees from "./sections/section-inscriptions-validees";
import SectionInscriptionsRefusees from "./sections/section-inscriptions-refusees";
import SectionActivitesModifier from "./sections/section-activites-modifier";
import SectionActivitesSupprimer from "./sections/section-activites-supprimer";

import "./root.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSection, setSelectedSection] = useState("home");
  const [selectedActiviteId, setSelectedActiviteId] = useState(null);

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
      "http://localhost:80/projet-la-grimpette/backend/php/login/deconnexion.php";
  };

  const renderContent = () => {
    switch (selectedSection) {
      // Inscriptions

      case "inscriptions":
        return {
          content: (
            <div>
              <Navinscriptions
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="inscriptions-content">
                <SectionInscriptions />
              </div>
            </div>
          ),
          className: "inscriptions-section inscriptions",
        };
      case "inscriptions-valide":
        return {
          content: (
            <div>
              <Navinscriptions
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="inscriptions-content">
                <SectionInscriptionsValidees />
              </div>
            </div>
          ),
          className: "inscriptions-section inscriptions",
        };
      case "inscriptions-refuse":
        return {
          content: (
            <div>
              <Navinscriptions
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="inscriptions-content">
                <SectionInscriptionsRefusees />
              </div>
            </div>
          ),
          className: "modifier-section inscriptions",
        };

      // Activites

      case "activites":
        return {
          content: (
            <div>
              <NavActivite
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <SectionActivites />
              </div>
            </div>
          ),
          className: "activites-section activites",
        };
      case "activites-ajouter":
        return {
          content: (
            <div>
              <NavActivite
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <SectionActivitesAjouter />
              </div>
            </div>
          ),
          className: "ajouter-section activites",
        };
      case "activites-modifier":
        return {
          content: (
            <div>
              <NavActivite
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <SectionActivitesModifier
                  selectedActiviteId={selectedActiviteId}
                />
              </div>
            </div>
          ),
          className: "modifier-section activites",
        };
      case "activites-supprimer":
        return {
          content: (
            <div>
              <NavActivite
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <div className="activites-content">
                <SectionActivitesSupprimer />
              </div>
            </div>
          ),
          className: "supprimer-section activites",
        };

      // Page home

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

  // Nav-bar + header

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
                <p
                  className="noBottomMargin"
                  onClick={() => setSelectedSection("inscriptions")}
                >
                  Inscriptions
                </p>
                <ul>
                  <li>
                    <p
                      onClick={() => setSelectedSection("inscriptions-valide")}
                    >
                      Validées
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => setSelectedSection("inscriptions-refuse")}
                    >
                      Refusées
                    </p>
                  </li>
                </ul>
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

            {/*Contenu de la page*/}

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
