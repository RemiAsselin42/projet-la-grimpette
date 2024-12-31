<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_activite.php");

header('Content-Type: application/json');

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("
            SELECT id_activite, nom_activite, date, description, heure, categorie, image FROM activite
        ");
    $stmt->execute();
    $allActivites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Include config for liste_activites and connect
    include("../activites/conf_bdd_activite.php");
    $bdd_activites = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd_activites->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Écrire le fichier
    if (file_put_contents("C:/wamp64/www/projet-la-grimpette/frontend/site_vitrine/json/activites.json", json_encode($allActivites, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
        echo json_encode($allActivites);
    } else {
        throw new Exception("Impossible d'écrire dans le fichier JSON");
    }

    if (file_put_contents("C:/wamp64/www/projet-la-grimpette/frontend/backoffice/src/json/activites.json", json_encode($allActivites, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
        echo json_encode($allActivites);
    } else {
        throw new Exception("Impossible d'écrire dans le fichier JSON");
    }

} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}