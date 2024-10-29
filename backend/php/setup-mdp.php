<?php
// http://localhost:80/projet-la-grimpette/backend/php/setup-mdp.php

include("conf_bdd_connexion.php");

$utilisateur = 'admin';
$prenom = 'Admin';
$mdp = 'coucou123'; // Mot de passe à changer
$mdpc = password_hash($mdp, PASSWORD_DEFAULT);
$mail = 'admin@example.com';

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare('INSERT INTO utilisateur (nom, prenom, mdp, mail) VALUES (:nom, :prenom, :mdp, :mail)');
    $stmt->execute([
        'nom' => $utilisateur,
        'prenom' => $prenom,
        'mdp' => $mdpc,
        'mail' => $mail
    ]);

    echo "Utilisateur inséré avec succès.";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>

