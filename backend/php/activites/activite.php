<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

include("conf_bdd_activite.php");

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération de toutes les activités,
    $stmt = $bdd->prepare("SELECT id_activite, nom_activite, date, heure, description, categorie, image FROM activite");
    $stmt->execute();

    $activites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($activites);
} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
}