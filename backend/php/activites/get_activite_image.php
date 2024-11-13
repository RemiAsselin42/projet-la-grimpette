<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

include("conf_bdd_activite.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    try {
        $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        error_log("Connexion à la base de données réussie");

        $stmt = $bdd->prepare("SELECT image FROM activite WHERE id_activite = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $activite = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($activite && !empty($activite['image'])) {
            $activite['image'] = 'data:image/jpeg;base64,' . base64_encode($activite['image']);
        }

        // Renvoi des résultats en JSON
        echo json_encode($activite);
    } catch (PDOException $erreur) {
        error_log("Erreur PDO: " . $erreur->getMessage());
        echo json_encode(['error' => $erreur->getMessage()]);
    }
} else {
    error_log("ID invalide");
    echo json_encode(['error' => 'ID invalide']);
}