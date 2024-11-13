<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

include("conf_bdd_activite.php");

$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data['id']) ? intval($data['id']) : 0;

if ($id > 0) {
    try {
        // Connexion à la base de données inscription_user
        $bdd_inscriptions = new PDO("mysql:host=$servername;dbname=inscription_user", $user, $pass);
        $bdd_inscriptions->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Connexion à la base de données liste_activites
        $bdd_activites = new PDO("mysql:host=$servername;dbname=liste_activites", $user, $pass);
        $bdd_activites->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Commencer les transactions sur les deux bases de données
        $bdd_inscriptions->beginTransaction();
        $bdd_activites->beginTransaction();

        // Fonction pour exécuter les requêtes de suppression
        function supprimerInscriptions($bdd, $table, $id)
        {
            $stmt = $bdd->prepare("DELETE FROM $table WHERE cours_client = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
        }

        // Supprimer les inscriptions associées à l'activité
        supprimerInscriptions($bdd_inscriptions, 'inscription_valide', $id);
        supprimerInscriptions($bdd_inscriptions, 'inscription_refus', $id);
        supprimerInscriptions($bdd_inscriptions, 'preinscription', $id);

        // Supprimer l'activité
        $stmt_activites = $bdd_activites->prepare("DELETE FROM activite WHERE id_activite = :id");
        $stmt_activites->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt_activites->execute();

        // Valider les transactions sur les deux bases de données
        $bdd_inscriptions->commit();
        $bdd_activites->commit();

    } catch (PDOException $e) {
        // Annuler les transactions en cas d'erreur
        if ($bdd_inscriptions->inTransaction()) {
            $bdd_inscriptions->rollBack();
        }
        if ($bdd_activites->inTransaction()) {
            $bdd_activites->rollBack();
        }
        error_log("Erreur PDO: " . $e->getMessage());
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    error_log("ID invalide");
    echo json_encode(["error" => "ID invalide"]);
}