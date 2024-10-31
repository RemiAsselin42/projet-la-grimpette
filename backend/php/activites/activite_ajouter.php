<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include("conf_bdd_activite.php");

$nom = $_POST['nom_activite'];
$date = $_POST['date'];
$heure = $_POST['heure'];
$description = $_POST['description'];
$categorie = $_POST['categorie'];
$image_data = null;

if (isset($_FILES['image'])) {
    if ($_FILES['image']['error'] == 0) {
        $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));

        // Convertir l'image en JPEG ou PNG si nécessaire
        if ($imageFileType == 'jpeg' || $imageFileType == 'jpg' || $imageFileType == 'png') {
            $image_data = file_get_contents($_FILES['image']["tmp_name"]);
        } else {
            echo "Format d'image non supporté.";
            exit;
        }
    } else {
        echo "Erreur lors de l'upload de l'image : " . $_FILES['image']['error'];
        exit;
    }
} else {
    echo "Aucun fichier image reçu.";
    exit;
}

if ($image_data === null) {
    echo "Erreur : L'image ne peut pas être vide.";
    exit;
}

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("INSERT INTO activite (nom_activite, date, heure, description, categorie, image) 
    VALUES (:nom, :date, :heure, :description, :categorie, :image_data)");
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':heure', $heure);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->bindParam(':image_data', $image_data, PDO::PARAM_LOB);
    $stmt->execute();
    echo "Activité ajoutée avec succès.";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}