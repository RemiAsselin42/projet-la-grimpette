import { useState, useRef } from "react";
import axios from "axios";
import "./section-activites-ajouter.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const SectionActivitesAjouter = () => {
  const hiddenFileInput = useRef(null);
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleIconClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (fileUploaded) {
      setImage(fileUploaded);
      setSelectedFileName(fileUploaded.name);
    }
  };

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

      toast.success("Activité ajoutée avec succès !", {
        position: "top-right",
      });

      // Reset form fields
      setNom("");
      setDate("");
      setHeure("");
      setDescription("");
      setCategorie("");
      setImage(null);
      setSelectedFileName("");
      hiddenFileInput.current.value = "";
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité:", error);
    }
  };

  return (
    <div id="page-activite-ajouter">
      <h2>Ajouter une Activité</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-grid">
          <div>
            <label>Nom de l&apos;activité</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              maxLength={50}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Heure</label>
            <input
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />
          </div>
          <div className="file-upload-container">
            <label>Image</label>
            <button
              className="file-upload-wrapper"
              onClick={handleIconClick}
              type="button"
            >
              <FontAwesomeIcon icon={faDownload} />
              {selectedFileName && (
                <span className="file-name">{selectedFileName}</span>
              )}
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{ display: "none" }}
              />
            </button>
          </div>
        </div>
        <div className="form-grid-2">
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={150}
            />
          </div>
          <div>
            <label>Catégorie</label>
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

        <button className="btnAjouter" type="submit">
          Ajouter l&apos;activité
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SectionActivitesAjouter;
