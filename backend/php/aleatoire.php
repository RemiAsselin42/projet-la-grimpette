<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Quiz</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

<body>
    <?php
//On démarre une nouvelle session
session_start();

// vérification session active
if(isset($_SESSION['idu']))
{
	$idu = $_SESSION['idu'];

	// paramètres de la BDD
	include("conf_bdd.php");

	try 
	{
		// connexion bdd
		$bdd = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
		$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		$i=0;

		// récupérer la taille d'un tableau 
		$i = count($tableau);
		$k=0; // créer les questions
		$j=1; // numérotation des questions

		// requete sql 
		foreach($bdd->query('SELECT nom, prenom from utilisateurs where idu="'.$idu.'" ') as $row) 
		{	
		}
		?>
    <h1> QUIZ </h1>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
                <li class="active"><a href="quiz.php">Quiz</a></li>
                <li><a href="decon.php">Déconnexion</a></li>
            </ul>
        </div>
    </nav>
    <?php		
		echo '<form action="trait.php" method="post">';

		echo '<p><b> Inscription <label for="inscription"></label></b><br/>';
		echo '<input type="radio" id="nom"> Nom : <br/>';
		echo '<input type="radio" id="prenom"> Prénom : <br/>';
		echo '<input type="radio" id="email"> E-Mail : <br/>';
		echo '<input type="radio" id="tel"> Téléphone : <br/></p>';

		$bdd = null;   // fermeture connexion
		echo '<div>
		<button type="submit">Valider</button>
	</div>
	</form>';

	$_SESSION['idq'] = $tableau;
	} 
	catch (PDOException $e) 
	{
		//traitement des erreurs
		print "Erreur !: " . $e->getMessage() . "<br/>";
		die();
	}
}
else header('location:connexion.htm'); // retour à la page connexion
?>