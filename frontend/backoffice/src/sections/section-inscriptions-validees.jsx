import { useState, useEffect } from "react";
import axios from "axios";

const SectionInscriptionsValidees = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/inscriptions/inscription_valide.php"
        );
        setInscriptions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

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
    <div id="section-inscriptions-validees">
      <h2>Liste des Inscriptions Validées</h2>
      {error && <p>Erreur lors du chargement des inscriptions : {error}</p>}
      {inscriptions.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Pas de nouvelles inscriptions validées pour le moment.
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
            </tr>
          </thead>
          <tbody>
            {inscriptions.map((inscription) => (
              <tr key={inscription.id_client}>
                <td>{inscription.nom_client}</td>
                <td>{inscription.prenom_client}</td>
                <td>{inscription.nom_activite}</td>
                <td>{getCategorieText(inscription.categorie)}</td>
                <td>0{inscription.tel_client}</td>
                <td>{inscription.mail_client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SectionInscriptionsValidees;
