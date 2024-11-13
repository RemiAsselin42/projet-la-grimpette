import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionInscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [activites, setActivites] = useState([]);
  const [selectedActivite, setSelectedActivite] = useState("");
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

    const fetchActivites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/activites/activite.php"
        );
        setActivites(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInscriptions();
    fetchActivites();
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
      toast.success("Inscription validée !", {
        position: "top-right",
      });
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
      toast.success("Inscription refusée !", {
        position: "top-right",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const getCategorieText = (categorie) => {
    switch (categorie) {
      case 1:
        return "Enfant";
      case 2:
        return "Ados";
      case 3:
        return "Adulte";
      default:
        return "Inconnue";
    }
  };

  const handleActiviteChange = (event) => {
    setSelectedActivite(event.target.value);
  };

  const filteredInscriptions = selectedActivite
    ? inscriptions.filter(
        (inscription) => inscription.nom_activite === selectedActivite
      )
    : inscriptions;

  return (
    <div id="section-inscriptions">
      <h2>Liste des Inscriptions</h2>
      {error && <p>Erreur lors du chargement des inscriptions : {error}</p>}
      <div className="activite-select-section">
        <label htmlFor="activite-select">Sélectionnez une activité :</label>
        <select
          id="activite-select"
          value={selectedActivite}
          onChange={handleActiviteChange}
        >
          <option value="">Toutes les activités</option>
          {activites.map((activite) => (
            <option key={activite.id_activite} value={activite.nom_activite}>
              {activite.nom_activite}
            </option>
          ))}
        </select>
      </div>
      {Array.isArray(filteredInscriptions) &&
      filteredInscriptions.length === 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID inscription</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Cours</th>
                <th>Catégorie</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
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
              <th>Catégorie</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredInscriptions) &&
              filteredInscriptions.map((inscription) => (
                <tr key={inscription.id_client}>
                  <td>{inscription.nom_client}</td>
                  <td>{inscription.prenom_client}</td>
                  <td>{inscription.nom_activite}</td>
                  <td>{getCategorieText(inscription.categorie)}</td>
                  <td>0{inscription.tel_client}</td>
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
      <ToastContainer />
    </div>
  );
};

export default SectionInscriptions;
