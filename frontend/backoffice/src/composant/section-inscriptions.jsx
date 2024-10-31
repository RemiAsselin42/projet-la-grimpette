import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const SectionInscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/get_inscriptions.php"
        );
        setInscriptions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInscriptions();
  }, []);

  const handleValidate = async (id) => {
    try {
      await axios.post(
        "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/validate_inscription.php",
        { id }
      );
      setInscriptions(
        inscriptions.filter((inscription) => inscription.id_client !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRefuse = async (id) => {
    try {
      await axios.post(
        "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/refuse_inscription.php",
        { id }
      );
      setInscriptions(
        inscriptions.filter((inscription) => inscription.id_client !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="section-inscriptions">
      <h2>Liste des Inscriptions</h2>
      {error && <p>Erreur lors du chargement des inscriptions : {error}</p>}
      {inscriptions.length === 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID inscription</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Cours</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Pas de nouvelles inscriptions pour le moment.
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
              <th>Actions</th>
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
                <td className="btnValidations">
                  <button
                    onClick={() => handleValidate(inscription.id_client)}
                    className="btnValider"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    onClick={() => handleRefuse(inscription.id_client)}
                    className="btnRefuser"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SectionInscriptions;
