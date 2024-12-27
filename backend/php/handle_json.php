<?php
function sauvegarderDonneesTemporairement($cheminFichierJSON, $donnees)
{
    // Créer un chemin pour le fichier temporaire
    $cheminFichierTemporaire = $cheminFichierJSON . '.tmp';

    // Convertir les données en JSON
    $jsonDonnees = json_encode($donnees, JSON_PRETTY_PRINT);

    // Sauvegarder les données dans le fichier temporaire
    if (file_put_contents($cheminFichierTemporaire, $jsonDonnees) === false) {
        throw new Exception('Erreur lors de la sauvegarde des données dans le fichier temporaire.');
    }

    // Renommer le fichier temporaire pour remplacer le fichier original
    if (!rename($cheminFichierTemporaire, $cheminFichierJSON)) {
        throw new Exception('Erreur lors du remplacement du fichier original par le fichier temporaire.');
    }
}

// Exemple d'utilisation pour les inscriptions
$cheminFichierInscriptions = 'http://localhost:80/projet-la-grimpette/backend/json/inscriptions.json';
$donneesInscriptions = [
    // Vos données d'inscriptions ici
];
sauvegarderDonneesTemporairement($cheminFichierInscriptions, $donneesInscriptions);

// Exemple d'utilisation pour les activités
$cheminFichierActivites = 'http://localhost:80/projet-la-grimpette/backend/json/activites.json';
$donneesActivites = [
    // Vos données d'activités ici
];
sauvegarderDonneesTemporairement($cheminFichierActivites, $donneesActivites);