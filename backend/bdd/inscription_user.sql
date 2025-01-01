-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 01 jan. 2025 à 20:23
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
-- Base de données : `inscription_user`
--

-- --------------------------------------------------------

--
-- Structure de la table `inscription_refus`
--

DROP TABLE IF EXISTS `inscription_refus`;
CREATE TABLE IF NOT EXISTS `inscription_refus` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) NOT NULL,
  `cours_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel_client` int NOT NULL,
  `mail_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscription_valide`
--

DROP TABLE IF EXISTS `inscription_valide`;
CREATE TABLE IF NOT EXISTS `inscription_valide` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) NOT NULL,
  `cours_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel_client` int NOT NULL,
  `mail_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `preinscription`
--

DROP TABLE IF EXISTS `preinscription`;
CREATE TABLE IF NOT EXISTS `preinscription` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) NOT NULL,
  `cours_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel_client` int NOT NULL,
  `mail_client` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `preinscription`
--

INSERT INTO `preinscription` (`id_client`, `nom_client`, `prenom_client`, `cours_client`, `tel_client`, `mail_client`) VALUES
(22, 'Creuset', 'Emilie', '1', 741039633, 'emilie.creuset@gmail.com'),
(9, 'Durand', 'Lucie', '7', 620458623, 'lucie.durand@gmail.com'),
(23, 'Coche', 'Marianne', '3', 645128563, 'marianne.coche@gmail.com'),
(19, 'Moulin', 'Damien', '5', 785562320, 'damien.moulin@gmail.com'),
(32, 'Paradi', 'Clémence', '3', 785693244, 'clemenceparadi@gmail.com'),
(31, 'Satre', 'Léna', '8', 756354154, 'lenasatre@gmail.com'),
(16, 'Lefevre', 'Julien', '6', 674127357, 'julien.lefevre@gmail.com'),
(17, 'Leroy', 'Manon', '4', 798547403, 'manon.leroy@gmail.com'),
(18, 'Moreau', 'Thomas', '1', 652448952, 'thomas.moreau@gmail.com'),
(20, 'Penot', 'Luca', '5', 645218563, 'luca.penot@gmail.com'),
(21, 'Serant', 'Emma', '2', 612859632, 'emma.serant@gmail.com'),
(11, 'Bernard', 'Jeanne', '2', 785985436, 'sophie.bernard@gmail.com'),
(12, 'Petit', 'Alain', '4', 741285266, 'alain.petit@gmail.com'),
(13, 'Robert', 'Marie', '1', 745626996, 'marie.robert@gmail.com'),
(14, 'Richard', 'Paul', '6', 632085122, 'paul.richard@gmail.com'),
(15, 'Dubois', 'Claire', '7', 688542357, 'claire.dubois@gmail.com'),
(30, 'Petit', 'Léo', '8', 654896454, 'leopetit@gmail.com'),
(10, 'Martin', 'Jean', '2', 712450268, 'jean.martin@gmail.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
