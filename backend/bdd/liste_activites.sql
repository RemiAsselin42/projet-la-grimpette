-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 29 déc. 2024 à 17:42
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `liste_activites`
--

-- --------------------------------------------------------

--
-- Structure de la table `activite`
--

DROP TABLE IF EXISTS `activite`;
CREATE TABLE IF NOT EXISTS `activite` (
  `id_activite` int NOT NULL AUTO_INCREMENT,
  `nom_activite` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `heure` time NOT NULL,
  `categorie` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id_activite`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `activite`
--

INSERT INTO `activite` (`id_activite`, `nom_activite`, `date`, `description`, `heure`, `categorie`, `image`) VALUES
(1, 'Sortie escalade.', '2025-01-16', 'Sortie escalade pour l\'équipe junior afin de découvrir l\'escalade sur roches.', '14:00:00', 1, ''),
(2, 'Concours de bloc ados.', '2025-01-11', 'Qualifications pour le concours de bloc de section régionale.', '10:30:00', 2, ''),
(3, 'Séance de renforcement musculaire. ', '2025-01-08', 'Programme habituel : exercices physiques bras/dos/abdos/jambes.', '20:00:00', 3, ''),
(4, 'Sortie via ferrata.', '2025-01-20', 'Sortie via ferrata d\'une demi-journée pour découvrir les gorges de la région.', '13:30:00', 3, ''),
(5, 'Cours de bloc.', '2025-01-04', 'Cours de bloc en salle.', '17:30:00', 1, ''),
(6, 'Soirée étudiante.', '2025-01-23', 'Soirée étudiante dans le grand gymnase pour tous les étudiants. 15€ l\'entrée.', '21:00:00', 2, ''),
(16, 'Cours débutant.', '2025-01-25', 'Pour apprendre les bases de l\'escalade et du bloc.', '17:00:00', 1, '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
