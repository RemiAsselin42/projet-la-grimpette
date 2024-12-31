<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_inscriptions.php");

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch the inscription details
    $stmt = $bdd->prepare("SELECT * FROM preinscription WHERE id_client = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $inscription = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($inscription) {
        // Insert into inscription_valide table
        $stmt = $bdd->prepare("INSERT INTO inscription_valide (id_client, nom_client, prenom_client, cours_client, tel_client, mail_client) VALUES (:id, :nom, :prenom, :cours, :tel, :mail)");
        $stmt->bindParam(':id', $inscription['id_client']);
        $stmt->bindParam(':nom', $inscription['nom_client']);
        $stmt->bindParam(':prenom', $inscription['prenom_client']);
        $stmt->bindParam(':cours', $inscription['cours_client']);
        $stmt->bindParam(':tel', $inscription['tel_client']);
        $stmt->bindParam(':mail', $inscription['mail_client']);
        $stmt->execute();

        // Delete from preinscription table
        $stmt = $bdd->prepare("DELETE FROM preinscription WHERE id_client = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        // Now retrieve all valid inscriptions without a JOIN
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

        // Write them to JSON
        file_get_contents("http://localhost/projet-la-grimpette/backend/php/inscriptions/reloadInscriptions.php");

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Inscription not found']);
    }
} catch (PDOException $erreur) {
    echo json_encode(['error' => $erreur->getMessage()]);
}