import { useState } from "react";
import axios from "axios";
import "./section-activites-ajouter.css";

const SectionActivitesAjouter = () => {
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom_activite", nom);
    formData.append("date", date);
    formData.append("heure", heure);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:80/projet-la-grimpette/backend/php/activites/activite_ajouter.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Reset form fields
      setNom("");
      setDate("");
      setHeure("");
      setDescription("");
      setCategorie("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité:", error);
    }
  };

  return (
    <div id="page-activite-ajouter">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-grid">
          <div>
            <label>Nom de l&apos;activité:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Heure:</label>
            <input
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-grid-2">
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Catégorie:</label>
            <div className="form-radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={categorie === "1"}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                />
                Enfants
              </label>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={categorie === "2"}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                />
                Ados
              </label>
              <label>
                <input
                  type="radio"
                  value="3"
                  checked={categorie === "3"}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                />
                Adultes
              </label>
            </div>
          </div>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setImage(e.target.files[0]);
            }}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Ajouter l&apos;activité</button>
      </form>
    </div>
  );
};

export default SectionActivitesAjouter;
