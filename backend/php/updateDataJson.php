<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

include("./activites/conf_bdd_activite.php");

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération de toutes les activités
    $stmt = $bdd->query("SELECT * FROM activite ORDER BY date, heure");
    $activites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Exclure les images en base64
    foreach ($activites as &$activite) {
        unset($activite['image']);
    }

    // Debug: Afficher les données récupérées
    echo "Données récupérées : " . print_r($activites );

    // Écriture dans le fichier JSON seulement si $activites n'est pas vide
    if (!empty($activites)) {
        $json_data = json_encode($activites, JSON_PRETTY_PRINT);
        file_put_contents(
            "C:/wamp64/www/projet-la-grimpette/backend/json/activites.json",
            $json_data
        );

        // Debug: Vérifier le contenu du fichier JSON
        $written_data = file_get_contents("C:/wamp64/www/projet-la-grimpette/backend/json/activites.json");
        echo "Données écrites dans le fichier JSON : " . $written_data;

        echo "success";
    } else {
        echo "No activities found";
    }
} catch (PDOException $e) {
    error_log("Erreur PDO : " . $e->getMessage());
    echo json_encode(["error" => $e->getMessage()]);
}