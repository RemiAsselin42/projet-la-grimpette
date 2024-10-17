<?php
include("conf_bdd2.php");

$utilisateur = $_POST['utilisateur'];
$mdp = $_POST['mdp'];
$mdpc = hash('sha512', $mdp);

try 
{
    $bdd = new PDO("mysql:host=$host;dbname=$database", $username, $password);
	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	foreach($bdd->query('SELECT idu from utilisateurs where utilisateur="'.$utilisateur.'" and mot="'.$mdpc.'"') as $row) 
	{		
	}
	$bdd = null;   

	if (isset($row[0])){
 		session_start();
		$_SESSION['idu'] = $row[0];
		
		header('location:formadmin.php');
	}
	else header('location:../index.htm'); 
} 
catch (PDOException $e) 
{
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}
?>