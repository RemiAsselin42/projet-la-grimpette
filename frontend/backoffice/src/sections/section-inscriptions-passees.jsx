import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionInscriptionsPassees = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchInscriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/get_inscriptions_passees.php"
      );
      setInscriptions(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, []);

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

  return (
    <div id="section-inscriptions-passees">
      <div className="section-title">
        <h2>Liste des Inscriptions Passées</h2>
      </div>
      {error && <p>Erreur lors du chargement des inscriptions : {error}</p>}
      <div className="table-container">
        {Array.isArray(inscriptions) && inscriptions.length === 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Cours</th>
                  <th>Catégorie</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Pas d&apos;inscriptions passées pour le moment.
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
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inscriptions) &&
                inscriptions.map((inscription) => (
                  <tr key={inscription.id_client}>
                    <td>{inscription.nom_client}</td>
                    <td>{inscription.prenom_client}</td>
                    <td>{inscription.nom_activite}</td>
                    <td>{getCategorieText(inscription.categorie)}</td>
                    <td>0{inscription.tel_client}</td>
                    <td>{inscription.mail_client}</td>
                    <td>{inscription.statut}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <div className="overlayBlock"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SectionInscriptionsPassees;
