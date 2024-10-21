<?php
include("conf_bdd_activite.php");

header('Content-Type: application/json');

try {
    // Connexion à la base de données
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour récupérer les données
    $stmt = $bdd->prepare("SELECT id_activite, nom_activite, date, heure, description, categorie FROM activite");
    $stmt->execute();

    // Récupération des résultats
    $activites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Renvoi des résultats en JSON
    echo json_encode($activites);
} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
}
?>