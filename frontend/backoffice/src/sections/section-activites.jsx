import { useState, useEffect } from "react";
import axios from "axios";

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
      <h2>Liste des Activités</h2>
      <ul>
        {sortedActivites.map((activite) => {
          const heureSansSecondes = activite.heure
            .slice(0, 5)
            .split(":")
            .join("h");
          const formattedDate = activite.date.split("-").reverse().join("/");
          const isPastActivity = new Date(activite.date) < new Date();
          return (
            <li
              key={activite.id_activite}
              className="activite"
              id={`div-activites-${activite.id_activite}`}
              style={{
                backgroundImage: isPastActivity
                  ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)  ), url(${activite.image})`
                  : `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${activite.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="activity-details"
                style={{
                  filter: isPastActivity ? "brightness(0.5)  " : "none",
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
    </div>
  );
};

export default SectionActivites;
