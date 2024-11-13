import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SectionActivitesModifier = () => {
  const [activites, setActivites] = useState([]);
  const [selectedActiviteId, setSelectedActiviteId] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/projet-la-grimpette/backend/php/activites/activite.php"
        );
        setActivites(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchActivites();
  }, []);

  useEffect(() => {
    if (selectedActiviteId) {
      const fetchActivites = async () => {
        try {
          const response = await axios.get(
            `http://localhost:80/projet-la-grimpette/backend/php/activites/get_activite_image.php?id=${selectedActiviteId}`
          );
          setImage(response.data.image || "");
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchActivites();
    }
  }, [selectedActiviteId]);

  useEffect(() => {
    if (selectedActiviteId) {
      const fetchActivite = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost/projet-la-grimpette/backend/php/activites/get_activite.php?id=${selectedActiviteId}`
          );

          if (response.data && typeof response.data === "object") {
            setNom(String(response.data.nom_activite || ""));
            setDescription(String(response.data.description || ""));
            setDate(String(response.data.date || ""));
            setHeure(String(response.data.heure || ""));
            setCategorie(String(response.data.categorie || ""));
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
    }
  }, [selectedActiviteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost/projet-la-grimpette/backend/php/activites/update_activite.php",
        {
          id: selectedActiviteId,
          nom,
          description,
          date,
          heure,
          categorie,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedActiviteId("");

      toast.success("Activité modifiée.", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Erreur lors de la modification de l'activité :", error);
    }
  };

  const handleCancel = () => {
    setSelectedActiviteId("");
    toast.info("Modifications annulées.", {
      position: "top-right",
    });
  };

  return (
    <div id="section-activites-modifier">
      <h2>Modifier une Activité</h2>
      <>
        <select
          value={selectedActiviteId}
          onChange={(e) => setSelectedActiviteId(e.target.value)}
          required
        >
          <option value="">-- Sélectionnez une activité --</option>
          {Array.isArray(activites) &&
            activites.map((activite) => (
              <option key={activite.id_activite} value={activite.id_activite}>
                {activite.nom_activite}
              </option>
            ))}
        </select>
        {selectedActiviteId && (
          <form onSubmit={handleSubmit}>
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <div
                className="modifierActivite"
                style={{
                  backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="inputNom">
                  <label>Nom de l&apos;activité :</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="input"
                  />
                </div>
                <div className="inputDescription">
                  <label>Description :</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="input"
                  />
                </div>
                <div className="inputDate">
                  <label>Date :</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="input"
                  />
                </div>
                <div className="inputHeure">
                  <label>Heure :</label>
                  <input
                    type="time"
                    value={heure}
                    onChange={(e) => setHeure(e.target.value)}
                    required
                    className="input"
                  />
                </div>
                <div className="inputCategorie">
                  <label>Catégorie :</label>
                  <div>
                    <input
                      type="radio"
                      id="enfant"
                      name="categorie"
                      value="1"
                      checked={categorie === "1"}
                      onChange={(e) => setCategorie(e.target.value)}
                      className="input"
                    />
                    <label htmlFor="enfant">Enfant</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ados"
                      name="categorie"
                      value="2"
                      checked={categorie === "2"}
                      onChange={(e) => setCategorie(e.target.value)}
                      className="input"
                    />
                    <label htmlFor="ados">Ados</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="adultes"
                      name="categorie"
                      value="3"
                      checked={categorie === "3"}
                      onChange={(e) => setCategorie(e.target.value)}
                      className="input"
                    />
                    <label htmlFor="adultes">Adultes</label>
                  </div>
                </div>
              </div>
            )}
            <button className="btnModifier" type="submit">
              Modifier
            </button>
            <button type="button" className="btnAnnuler" onClick={handleCancel}>
              Annuler
            </button>
          </form>
        )}
        <ToastContainer />
      </>
    </div>
  );
};

export default SectionActivitesModifier;
