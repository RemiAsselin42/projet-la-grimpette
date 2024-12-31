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

// Par défaut, on stockera seulement "/images/<nomfichier>" en base
$imagePath = null;

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $bdd->prepare("INSERT INTO activite 
        (nom_activite, date, heure, description, categorie) 
        VALUES (:nom, :date, :heure, :description, :categorie)");
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':heure', $heure);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->execute();

    $activiteId = $bdd->lastInsertId();

    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
        $uniqueFileName = "image-" . $activiteId . "." . $imageFileType;

        $targetFileBackoffice = $backofficeDir . $uniqueFileName;
        $targetFileFrontend = $frontendDir . $uniqueFileName;

        if (in_array($imageFileType, ["jpg", "jpeg", "png", "webp", "bmp", "svg", "avif"])) {
            // Déplacement vers le backoffice
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFileBackoffice)) {
                // Copie vers le site vitrine
                copy($targetFileBackoffice, $targetFileFrontend);

                $stmtUpdate = $bdd->prepare("UPDATE activite SET image = :image WHERE id_activite = :id");
                $stmtUpdate->bindParam(':image', $uniqueFileName);
                $stmtUpdate->bindParam(':id', $activiteId);
                $stmtUpdate->execute();
            } else {
                echo "Erreur lors du déplacement du fichier dans le backoffice.";
                exit;
            }
        } else {
            echo "Format d'image non supporté.";
            exit;
        }
    } else {
        echo "Aucun fichier image valide trouvé.";
        exit;
    }

    echo "Activité ajoutée avec succès.";

    // Met à jour le JSON
        file_get_contents("http://localhost/projet-la-grimpette/backend/php/inscriptions/reloadInscriptions.php");
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}