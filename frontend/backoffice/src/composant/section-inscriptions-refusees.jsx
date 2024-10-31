import React, { useState, useEffect } from "react";
import axios from "axios";

const SectionInscriptionsRefusees = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/inscription_refus.php"
        );
        setInscriptions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInscriptions();
  }, []);

  return (
    <div id="section-inscriptions-refusees">
      <h2>Liste des Inscriptions Refusées</h2>
      {error && <p>Erreur lors du chargement des inscriptions : {error}</p>}
      {inscriptions.length === 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Cours</th>
                <th>Téléphone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Pas de nouvelles inscriptions refusées pour le moment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Cours</th>
              <th>Téléphone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {inscriptions.map((inscription) => (
              <tr key={inscription.id_client}>
                <td>{inscription.nom_client}</td>
                <td>{inscription.prenom_client}</td>
                <td>{inscription.cours_client}</td>
                <td>{inscription.tel_client}</td>
                <td>{inscription.mail_client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SectionInscriptionsRefusees;
