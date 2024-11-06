<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
include("conf_bdd_activite.php");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (is_null($data) || !isset($data['id'])) {
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

$id = $data['id'];

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $bdd->prepare("DELETE FROM activite WHERE id_activite = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo json_encode(["message" => "Activité supprimée avec succès"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}