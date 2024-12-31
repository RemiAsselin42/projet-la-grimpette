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
  const [loading, setLoading] = useState(false);

  const getCategorieLabel = (categorie) => {
    switch (parseInt(categorie)) {
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

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get("./src/json/activites.json");
        setActivites(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des activités :", error);
      }
    };

    fetchActivites();
  }, []);
  useEffect(() => {
    if (selectedActiviteId) {
      const fetchActivite = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost/projet-la-grimpette/backend/php/activites/get_activite.php?id=${selectedActiviteId}`
          );

          if (response.data && typeof response.data === "object") {
            setSelectedActivite(response.data);
          } else {
            console.error("Données inattendues:", response.data);
          }
        } catch (error) {
          console.error("Erreur lors du chargement de l'activité :", error);
        } finally {
          setLoading(false);
        }
      };

      fetchActivite();
    } else {
      setSelectedActivite(null);
    }
  }, [selectedActiviteId]);

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
            <option value="">Sélectionnez une activité</option>
            {activites.map((activite) => (
              <option key={activite.id_activite} value={activite.id_activite}>
                {activite.nom_activite}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          selectedActivite &&
          selectedActivite.date && (
            <div id="section-activites">
              <div
                className="activite-details"
                style={{
                  backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(./src/images/${selectedActivite.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3>{selectedActivite.nom_activite}</h3>
                <p>
                  <b>Date:</b>{" "}
                  {selectedActivite.date.split("-").reverse().join("/")}
                </p>
                <p>
                  <b>Heure: </b>
                  {selectedActivite.heure.slice(0, 5).split(":").join("h")}
                </p>
                <p>
                  <b>Description:</b> {selectedActivite.description}
                </p>
                <p>
                  <b>Catégorie:</b>{" "}
                  {getCategorieLabel(selectedActivite.categorie)}
                </p>
              </div>
            </div>
          )
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
