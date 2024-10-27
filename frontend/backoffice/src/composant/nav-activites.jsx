import PropTypes from "prop-types";

const NavMenu = ({ setSelectedSection, selectedSection }) => {
  return (
    <nav id="navActivites">
      <ul>
        <li
          className={selectedSection === "activites" ? "active" : ""}
          onClick={() => setSelectedSection("activites")}
        >
          {<p /*style={{ fontWeight: 900 }}*/>Activités</p>}
        </li>
        <li
          className={selectedSection === "activites-ajouter" ? "active" : ""}
          onClick={() => setSelectedSection("activites-ajouter")}
        >
          <p>Ajouter</p>
        </li>
        <li
          className={selectedSection === "activites-modifier" ? "active" : ""}
          onClick={() => setSelectedSection("activites-modifier")}
        >
          <p>Modifier</p>
        </li>
        <li
          className={selectedSection === "activites-supprimer" ? "active" : ""}
          onClick={() => setSelectedSection("activites-supprimer")}
        >
          <p>Supprimer</p>
        </li>
      </ul>
    </nav>
  );
};

NavMenu.propTypes = {
  setSelectedSection: PropTypes.func.isRequired,
  selectedSection: PropTypes.string.isRequired,
};

export default NavMenu;
