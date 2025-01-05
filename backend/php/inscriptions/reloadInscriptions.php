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

    $filteredInscriptions = [];
    $currentDate = new DateTime();

    // Replace ID with course name and filter by date
    foreach ($validInscriptions as &$row) {
        $stmt2 = $bdd_activites->prepare("SELECT nom_activite, date FROM activite WHERE id_activite = :id_activite");
        $stmt2->bindParam(':id_activite', $row['cours_client']);
        $stmt2->execute();
        $act = $stmt2->fetch(PDO::FETCH_ASSOC);
        if ($act) {
            $activityDate = new DateTime($act['date']);
            if ($activityDate > $currentDate) {
                $row['cours_client'] = $act['nom_activite'];
                $filteredInscriptions[] = $row;
            }
        }
    }
    unset($row);

    // Définir le chemin du dossier et du fichier
    $jsonDir = "C:/wamp64/www/projet-la-grimpette/frontend/site_vitrine/json";
    $jsonFile = $jsonDir . "/inscriptions_valides.json";

    // Vider le fichier avant d'écrire les nouvelles données
    file_put_contents($jsonFile, '');

    // Écrire le fichier
    if (file_put_contents($jsonFile, json_encode($filteredInscriptions, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'data' => $filteredInscriptions]);
    } else {
        throw new Exception("Impossible d'écrire dans le fichier JSON");
    }

} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}