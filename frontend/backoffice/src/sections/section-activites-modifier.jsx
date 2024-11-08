import { useState, useEffect } from "react";
import axios from "axios";

const SectionActivitesModifier = () => {
  const [activites, setActivites] = useState([]);
  const [selectedActiviteId, setSelectedActiviteId] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [categorie, setCategorie] = useState("");

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
      const fetchActivite = async () => {
        try {
          const response = await axios.get(
            `http://localhost/projet-la-grimpette/backend/php/activites/get_activite.php?id=${selectedActiviteId}`
          );
          setNom(response.data.nom_activite || "");
          setDescription(response.data.description || "");
          setDate(response.data.date || "");
          setHeure(response.data.heure || "");
          setCategorie(response.data.categorie || "");
        } catch (error) {
          console.error("Erreur lors du chargement de l'activité :", error);
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
      alert("Activité modifiée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de l'activité :", error);
    }
  };

  return (
    <div id="section-activites-modifier">
      <h2>Modifier une Activité</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        {selectedActiviteId && (
          <>
            <div>
              <label>Nom de l&apos;activité :</label>
              <input
                type="text"
                defaultValue={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description :</label>
              <textarea
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date :</label>
              <input
                type="date"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Heure :</label>
              <input
                type="time"
                defaultValue={heure}
                onChange={(e) => setHeure(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Catégorie :</label>
              <div>
                <input
                  type="radio"
                  id="enfant"
                  name="categorie"
                  value="1"
                  checked={categorie === "1"}
                  onChange={(e) => setCategorie(e.target.value)}
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
                />
                <label htmlFor="adultes">Adultes</label>
              </div>
            </div>
            <button type="submit">Modifier</button>
          </>
        )}
      </form>
    </div>
  );
};

export default SectionActivitesModifier;
