-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 05 jan. 2025 à 11:05
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

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
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_activite`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `activite`
--

INSERT INTO `activite` (`id_activite`, `nom_activite`, `date`, `description`, `heure`, `categorie`, `image`) VALUES
(1, 'Sortie escalade.', '2025-01-21', 'Sortie escalade pour l\'équipe junior afin de découvrir l\'escalade sur roches.', '14:00:00', 1, 'image-1.jpg'),
(2, 'Concours de bloc.', '2025-01-02', 'Qualifications pour le concours de bloc de section régionale.', '10:30:00', 2, 'image-2.jpg'),
(3, 'Séance de renforcement musculaire. ', '2025-01-08', 'Programme habituel : exercices physiques bras/dos/abdos/jambes.\r\nDécouverte de la callisthénie avec un coach.', '20:00:00', 3, 'image-3.jpg'),
(4, 'Sortie via ferrata.', '2025-01-11', 'Sortie via ferrata d\'une demi-journée pour découvrir les gorges de la région.', '13:30:00', 3, 'image-4.jpg'),
(5, 'Cours de bloc.', '2025-01-26', 'Cours de bloc en salle.', '17:30:00', 1, 'image-5.jpg'),
(6, 'Soirée étudiante.', '2025-01-12', 'Soirée étudiante dans le grand gymnase pour tous les étudiants. 15€ l\'entrée.', '21:00:00', 2, 'image-6.jpeg'),
(7, 'Cours de montée en tête.', '2025-01-28', 'Cours pour apprendre à monter en tête sur les voies de 12m.', '19:30:00', 2, 'image-7.jpg'),
(9, 'Repas de Noël.', '2024-12-20', 'Repas de Noël avant les vacances.', '19:00:00', 1, 'image-9.png'),
(8, 'Sortie accrobranche.', '2025-01-29', 'Sortie accrobranche dans les bois🌲', '14:00:00', 1, 'image-8.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
