import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const SectionActivitesSupprimer = () => {
  const [activites, setActivites] = useState([]);
  const [selectedActiviteId, setSelectedActiviteId] = useState("");
  const [selectedActivite, setSelectedActivite] = useState(null);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get(
          "http://localhost/projet-la-grimpette/backend/php/activites/get_all_activites.php"
        );
        setActivites(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des activités :", error);
      }
    };

    fetchActivites();
  }, []);

  useEffect(() => {
    if (selectedActiviteId) {
      const activite = activites.find(
        (activite) => activite.id_activite === selectedActiviteId
      );
      setSelectedActivite(activite);
    } else {
      setSelectedActivite(null);
    }
  }, [selectedActiviteId, activites]);

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost/projet-la-grimpette/backend/php/activites/delete_activite.php",
        { id: selectedActiviteId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Affiche la réponse complète
      console.log(response.data.message); // Affiche le message spécifique
      setActivites(
        activites.filter(
          (activite) => activite.id_activite !== selectedActiviteId
        )
      );
      setSelectedActiviteId("");
      toast.success("Activité supprimée.", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'activité :", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirmer la suppression",
      message: "Êtes-vous sûr de vouloir supprimer cette activité ?",
      buttons: [
        {
          label: "Oui",
          onClick: handleDelete,
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div id="section-activites-supprimer">
      <h2>Supprimer une Activité</h2>
      <form onSubmit={handleSubmit}>
        <div className="selecteur-activites">
          <select
            value={selectedActiviteId}
            onChange={(e) => setSelectedActiviteId(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez une activité --</option>
            {activites.map((activite) => (
              <option key={activite.id_activite} value={activite.id_activite}>
                {activite.nom_activite}
              </option>
            ))}
          </select>
        </div>
        {selectedActivite && (
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
        )}
        {selectedActiviteId && (
          <button className="btnSupprimer" type="submit">
            Supprimer
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default SectionActivitesSupprimer;
