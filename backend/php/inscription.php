<?php
include("conf_bdd.php");

$nom = $_POST['nom_client'];
$prenom = $_POST['prenom_client'];
$cours = $_POST['cours_client'];
$telephone = $_POST['tel_client'];
$mail = $_POST['email_client'];

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	echo "Cours : " . $cours . "<br>";

    if (empty($nom) || empty($prenom) || empty($mail) || empty($telephone) || empty($cours)) {
        throw new Exception('Tous les champs sont obligatoires.');
    }

    $prepare = $bdd->prepare("INSERT INTO preinscription (nom_client, prenom_client, cours_client, tel_client, mail_client) 
    VALUES (:nom_client, :prenom_client, :cours_client, :tel_client, :mail_client)");
    $prepare->bindParam(':nom_client', $nom);
    $prepare->bindParam(':prenom_client', $prenom);
    $prepare->bindParam(':cours_client', $cours);
    $prepare->bindParam(':tel_client', $telephone);
    $prepare->bindParam(':mail_client', $mail);
    $prepare->execute();

    $bdd = null; 
    include("save.php");
    header('location:../../frontend/site_vitrine/success.html');
} catch (PDOException $erreur) {
    echo 'Erreur PDO : ' . $erreur->getMessage();
} catch (Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
}
?>