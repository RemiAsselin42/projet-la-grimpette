<?php
include("conf_bdd.php");
	$nom = $_POST['nom'];
	$prenom = $_POST['prenom'];
	$mail = $_POST['email'];
	$formation = $_POST['formation'];

	try {
		$bdd = new PDO("mysql:host=$servername;dbname=$dbname",
		$user, $pass);
		$bdd->setAttribute(PDO::ATTR_ERRMODE, 
		PDO::ERRMODE_EXCEPTION);
		
		$prepare = $bdd->prepare("INSERT INTO inscription (nom, prenom, mail, formation) 
		VALUES (:nom, :prenom, :mail, :formation)");
		$prepare->bindParam(':nom', $nom);
		$prepare->bindParam(':prenom', $prenom);
		$prepare->bindParam(':mail', $mail);
		$prepare->bindParam(':formation', $formation);
		$prepare->execute();
		$bdd = null; 
		include("save.php");
		header('location:inscription.htm');
		}
	catch(PDOException $erreur)
		{
			echo $erreur.' --  '. $erreur->getMessage();
		}
?>