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
$image_path = '';

if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $target_dir = "../../frontend/site_vitrine/public/uploads/";
    $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
    $target_file = $target_dir . uniqid() . '.' . $imageFileType;

    // Convertir l'image en JPEG ou PNG si nécessaire
    if ($imageFileType == 'jpeg' || $imageFileType == 'jpg' || $imageFileType == 'png') {
        if (move_uploaded_file($_FILES['image']["tmp_name"], $target_file)) {
            $image_path = 'uploads/' . basename($target_file); // Chemin relatif pour le frontend
        } else {
            echo "Erreur lors du téléchargement de l'image.";
            exit;
        }
    } else {
        echo "Format d'image non supporté.";
        exit;
    }
}

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("INSERT INTO activite (nom_activite, date, heure, description, categorie, image_path) 
    VALUES (:nom, :date, :heure, :description, :categorie, :image_path)");
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':heure', $heure);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->bindParam(':image_path', $image_path);
    $stmt->execute();
    echo "Activité ajoutée avec succès.";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>