<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_inscriptions.php");

header('Content-Type: application/json');

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("
            SELECT id_client, nom_client, prenom_client, cours_client
            FROM inscription_valide
        ");
    $stmt->execute();
    $validInscriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Include config for liste_activites and connect
    include("../activites/conf_bdd_activite.php");
    $bdd_activites = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd_activites->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Replace ID with course name
    foreach ($validInscriptions as &$row) {
        $stmt2 = $bdd_activites->prepare("SELECT nom_activite FROM activite WHERE id_activite = :id_activite");
        $stmt2->bindParam(':id_activite', $row['cours_client']);
        $stmt2->execute();
        $act = $stmt2->fetch(PDO::FETCH_ASSOC);
        if ($act) {
            $row['cours_client'] = $act['nom_activite'];
        }
    }
    unset($row);

    // Définir le chemin du dossier et du fichier
    $jsonDir = "C:/wamp64/www/projet-la-grimpette/frontend/site_vitrine/json";
    $jsonFile = $jsonDir . "/inscriptions_valides.json";

    // Créer le dossier s'il n'existe pas
    if (!file_exists($jsonDir)) {
        mkdir($jsonDir, 0777, true);
    }

    // Écrire le fichier
    if (file_put_contents($jsonFile, json_encode($validInscriptions, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
        echo json_encode($validInscriptions);
    } else {
        throw new Exception("Impossible d'écrire dans le fichier JSON");
    }

} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}