import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionActivites = () => {
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/activites/activite.php"
        );
        setActivites(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivites();
  }, []);

  if (loading) {
    return <p>Chargement des activités...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des activités : {error}</p>;
  }

  if (!Array.isArray(activites)) {
    return <p>Erreur: Les données des activités ne sont pas valides.</p>;
  }

  const getCategorieLabel = (categorie) => {
    switch (categorie) {
      case 1:
        return "Enfants";
      case 2:
        return "Ados";
      case 3:
        return "Adultes";
      default:
        return "Inconnu";
    }
  };

  const sortedActivites = [...activites].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div id="section-activites">
      <div className="section-title">
        <h2>Liste des Activités</h2>
      </div>

      <ul>
        {sortedActivites
          .filter((activite) => new Date(activite.date) >= new Date())
          .map((activite) => {
            const heureSansSecondes = activite.heure
              .slice(0, 5)
              .split(":")
              .join("h");
            const formattedDate = activite.date.split("-").reverse().join("/");
            return (
              <li
                key={activite.id_activite}
                className="activite"
                id={`div-activites-${activite.id_activite}`}
                style={{
                  backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(./src/images/${activite.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="activity-details">
                  <h3>{activite.nom_activite}</h3>
                  <p>
                    <b>Date: </b>
                    {formattedDate}
                  </p>
                  <p>
                    <b>Heure:</b> {heureSansSecondes}
                  </p>
                  <p>
                    <b>Description:</b> {activite.description}
                  </p>
                  <p>
                    <b>Catégorie:</b> {getCategorieLabel(activite.categorie)}
                  </p>
                </div>
              </li>
            );
          })}

        {sortedActivites.some(
          (activite) => new Date(activite.date) < new Date()
        ) && (
          <h3
            style={{
              width: "100%",
              textAlign: "center",
              margin: "2rem 0",
              color: "#08415c",
            }}
          >
            Activités passées ci-dessous
          </h3>
        )}

        {sortedActivites
          .filter((activite) => new Date(activite.date) < new Date())
          .map((activite) => {
            const heureSansSecondes = activite.heure
              .slice(0, 5)
              .split(":")
              .join("h");
            const formattedDate = activite.date.split("-").reverse().join("/");
            return (
              <li
                key={activite.id_activite}
                className="activite"
                id={`div-activites-${activite.id_activite}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)  ), url(./src/images/${activite.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="activity-details"
                  style={{
                    filter: "brightness(0.5)",
                  }}
                >
                  <h3>{activite.nom_activite}</h3>
                  <p>
                    <b>Date: </b>
                    {formattedDate}
                  </p>
                  <p>
                    <b>Heure:</b> {heureSansSecondes}
                  </p>
                  <p>
                    <b>Description:</b> {activite.description}
                  </p>
                  <p>
                    <b>Catégorie:</b> {getCategorieLabel(activite.categorie)}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default SectionActivites;
