<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_connexion.php");

$utilisateur = $_POST['utilisateur'] ?? '';
$mdp = $_POST['mdp'] ?? '';

if (empty($utilisateur) || empty($mdp)) {
    echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe manquant']);
    exit;
}

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare('SELECT id_utilisateur, mdp FROM utilisateur WHERE nom = :utilisateur');
    $stmt->execute(['utilisateur' => $utilisateur]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && password_verify($mdp, $row['mdp'])) {
        session_start();
        $_SESSION['idu'] = $row['id_utilisateur'];
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe incorrect']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>