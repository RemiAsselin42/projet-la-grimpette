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

// Chemins vers les dossiers où stocker l'image
$backofficeDir = "C:/wamp64/www/projet-la-grimpette/frontend/backoffice/src/images/";
$frontendDir = "C:/wamp64/www/projet-la-grimpette/frontend/site_vitrine/images/";

$imagePath = null;
$imageFileType = null;
$tmpImagePath = null;

if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
    $tmpImagePath = $_FILES["image"]["tmp_name"];

    if (!in_array($imageFileType, ["jpg", "jpeg", "png", "webp", "bmp", "svg"])) {
        echo "Format d'image non supporté.";
        exit;
    }
} else {
    echo "Aucun fichier image valide trouvé.";
    exit;
}

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insérer l'activité sans l'image
    $stmt = $bdd->prepare("INSERT INTO activite 
        (nom_activite, date, heure, description, categorie) 
        VALUES (:nom, :date, :heure, :description, :categorie)");
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':heure', $heure);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->execute();

    // Récupérer l'id de l'activité créée
    $activiteId = $bdd->lastInsertId();

    // Nommer l'image en fonction de l'id de l'activité
    $uniqueFileName = "image-activite-" . $activiteId . "." . $imageFileType;
    $targetFileBackoffice = $backofficeDir . $uniqueFileName;
    $targetFileFrontend = $frontendDir . $uniqueFileName;

    // Déplacer l'image vers le backoffice et copier vers le site vitrine
    if (move_uploaded_file($tmpImagePath, $targetFileBackoffice)) {
        copy($targetFileBackoffice, $targetFileFrontend);

        // Mettre à jour le chemin de l'image dans la base de données
        $imagePath = "/images/" . $uniqueFileName;
        $stmt = $bdd->prepare("UPDATE activite SET image = :image WHERE id_activite = :id");
        $stmt->bindParam(':image', $imagePath);
        $stmt->bindParam(':id', $activiteId);
        $stmt->execute();

        echo "Activité ajoutée avec succès.";
    } else {
        echo "Erreur lors du déplacement du fichier.";
        exit;
    }

    // Met à jour le JSON
    file_get_contents("http://localhost/projet-la-grimpette/backend/php/updateDataJson.php");
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}