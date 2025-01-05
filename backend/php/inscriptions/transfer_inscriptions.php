<?php
// http://localhost:80/projet-la-grimpette/backend/php/inscriptions/transfer_inscriptions.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');
include("conf_bdd_inscriptions.php");

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $bdd->beginTransaction();

    // Transférer les données de la table inscription_valide vers preinscription
    $stmt = $bdd->prepare("
        INSERT INTO preinscription (id_client, nom_client, prenom_client, cours_client, tel_client, mail_client)
        SELECT id_client, nom_client, prenom_client, cours_client, tel_client, mail_client
        FROM inscription_valide
    ");
    $stmt->execute();

    // Supprimer les données de la table inscription_valide
    $stmt = $bdd->prepare("DELETE FROM inscription_valide");
    $stmt->execute();

    // Transférer les données de la table inscription_refus vers preinscription
    $stmt = $bdd->prepare("
        INSERT INTO preinscription (id_client, nom_client, prenom_client, cours_client, tel_client, mail_client)
        SELECT id_client, nom_client, prenom_client, cours_client, tel_client, mail_client
        FROM inscription_refus
    ");
    $stmt->execute();

    // Supprimer les données de la table inscription_refus
    $stmt = $bdd->prepare("DELETE FROM inscription_refus");
    $stmt->execute();

    $bdd->commit();

    echo json_encode(["success" => true, "message" => "Données transférées avec succès."]);
} catch (PDOException $e) {
    $bdd->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}