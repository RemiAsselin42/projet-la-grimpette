<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_activite.php");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Ajoutez des logs pour vérifier ce qui est reçu
error_log("Input data: " . $input);
error_log("Decoded data: " . print_r($data, true));

if (is_null($data)) {
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

$id = isset($data['id']) ? $data['id'] : null;
$nom = isset($data['nom']) ? $data['nom'] : null;
$description = isset($data['description']) ? $data['description'] : null;
$date = isset($data['date']) ? $data['date'] : null;
$heure = isset($data['heure']) ? $data['heure'] : null;
$categorie = isset($data['categorie']) ? $data['categorie'] : null;

if (is_null($id) || is_null($nom) || is_null($description) || is_null($date) || is_null($heure) || is_null($categorie)) {
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("UPDATE activite SET nom_activite = :nom, description = :description, date = :date, heure = :heure, categorie = :categorie WHERE id_activite = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':heure', $heure);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->execute();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}