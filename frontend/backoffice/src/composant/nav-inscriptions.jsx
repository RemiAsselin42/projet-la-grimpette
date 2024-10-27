import PropTypes from "prop-types";

const NavMenu = ({ setSelectedSection, selectedSection }) => {
  return (
    <nav>
      <ul>
        <li
          className={selectedSection === "inscriptions" ? "active" : ""}
          onClick={() => setSelectedSection("inscriptions")}
        >
          {<p /*style={{ fontWeight: 900 }}*/>Inscriptions</p>}
        </li>
        <li
          className={selectedSection === "inscriptions-valide" ? "active" : ""}
          onClick={() => setSelectedSection("inscriptions-valide")}
        >
          <p>Validées</p>
        </li>
        <li
          className={selectedSection === "inscriptions-refuse" ? "active" : ""}
          onClick={() => setSelectedSection("inscriptions-refuse")}
        >
          <p>Refusées</p>
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
