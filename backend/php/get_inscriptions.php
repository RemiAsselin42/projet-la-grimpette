<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd.php");

header('Content-Type: application/json');

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("SELECT id_client, nom_client, prenom_client, cours_client, tel_client, mail_client FROM preinscription");
    $stmt->execute();

    $inscriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($inscriptions);
} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
}
?>