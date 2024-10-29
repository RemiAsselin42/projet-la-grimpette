import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SectionActivites = () => {
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/activite.php"
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

  return (
    <div id="section-activites">
      <h2>Liste des Activités</h2>
      <ul>
        {activites.map((activite) => (
          <li key={activite.id_activite}>
            <h3>{activite.nom_activite}</h3>
            <p>Date: {activite.date}</p>
            <p>Heure: {activite.heure}</p>
            <p>Description: {activite.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionActivites;