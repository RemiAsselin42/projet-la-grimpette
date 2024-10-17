<?php
include("conf_bdd.php");
	$nom = $_POST['nom'];
	$prenom = $_POST['prenom'];
	$mail = $_POST['email'];
	$telephone = $_POST['telephone'];

	try {
		$bdd = new PDO("mysql:host=$servername;dbname=$dbname",
		$user, $pass);
		$bdd->setAttribute(PDO::ATTR_ERRMODE, 
		PDO::ERRMODE_EXCEPTION);
		
		$prepare = $bdd->prepare("INSERT INTO preinscription (nom_client, prenom_client, mail_client, tel_client) 
		VALUES (:nom_client, :prenom_client, :mail_client, :tel_client)");
		$prepare->bindParam(':nom_client', $nom);
		$prepare->bindParam(':prenom_client', $prenom);
		$prepare->bindParam(':mail_client', $mail);
		$prepare->bindParam(':tel_client', $telephone);
		$prepare->execute();
		$bdd = null; 
		include("save.php");
		header('location:inscrits.htm');
		}
	catch(PDOException $erreur)
		{
			echo $erreur.' --  '. $erreur->getMessage();
		}
?>