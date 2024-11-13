<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_inscriptions.php");

try {
    // Connexion à la base de données inscription_user
    $bdd_inscriptions = new PDO("mysql:host=$servername;dbname=inscription_user", $user, $pass);
    $bdd_inscriptions->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Connexion à la base de données liste_activites
    $bdd_activites = new PDO("mysql:host=$servername;dbname=liste_activites", $user, $pass);
    $bdd_activites->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL pour récupérer les inscriptions
    $stmt_inscriptions = $bdd_inscriptions->prepare("
        SELECT id_client, nom_client, prenom_client, tel_client, mail_client, cours_client
        FROM preinscription
    ");
    $stmt_inscriptions->execute();
    $inscriptions = $stmt_inscriptions->fetchAll(PDO::FETCH_ASSOC);

    // Requête SQL pour récupérer les noms des activités et les catégories
    $stmt_activites = $bdd_activites->prepare("
        SELECT id_activite, nom_activite, categorie
        FROM activite
    ");
    $stmt_activites->execute();
    $activites = $stmt_activites->fetchAll(PDO::FETCH_ASSOC);

    // Créer un tableau associatif pour les noms des activités et les catégories
    $activite_map = [];
    foreach ($activites as $activite) {
        $activite_map[$activite['id_activite']] = [
            'nom_activite' => $activite['nom_activite'],
            'categorie' => $activite['categorie']
        ];
    }

    // Ajouter le nom de l'activité et la catégorie à chaque inscription
    foreach ($inscriptions as &$inscription) {
        $inscription['nom_activite'] = $activite_map[$inscription['cours_client']]['nom_activite'] ?? 'Activité inconnue';
        $inscription['categorie'] = $activite_map[$inscription['cours_client']]['categorie'] ?? 'Catégorie inconnue';
    }

    echo json_encode($inscriptions);
} catch (PDOException $erreur) {
    echo 'Erreur PDO : ' . $erreur->getMessage();
}