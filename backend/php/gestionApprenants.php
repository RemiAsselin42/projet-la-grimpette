<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Gestion TELECOM</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
  <link href="../bootstrap-5.2.3/css/bootstrap.min.css" rel="stylesheet">
  <script src="../bootstrap-5.2.3/js/bootstrap.bundle.min.js"></script>
  <style>
  .fakeimg {
    height: 200px;
    background: #aaa;
  }
  </style>
</head>
<body>
<?php
session_start();
if(isset($_SESSION['idu']))
{
?>
	<div class="p-5 bg-primary text-white text-center">
	  <div><img src="../images/logo.svg" width=25%></div><h1>Gestion TELECOM</h1>
	</div>

	<?php include_once 'menu.php' ?>

	<div class="container">
	  <h2>Gestion des Apprenants</h2>
	  <div class="d-grid gap-2 d-md-block">
		<a href="AjoutApprenants.php" class="btn btn-primary" type="button">Ajouter</a>
		<a href="ModifApprenants.php" class="btn btn-success" type="button">Modifier</a>
		<a href="SupApprenants.php"   class="btn btn-danger"  type="button">Supprimer</a>
	  </div><br/>

	  <table class="table table-dark table-hover">
	  <thead>
		<tr>
		  <th scope="col">Photo</th>
		  <th scope="col">Nom</th>
		  <th scope="col">Prénom</th>
		  <th scope="col">Mail</th>
		  <th scope="col">Téléphone</th>
		  <th scope="col">Formation</th>
		</tr>
	  </thead>
	  <tbody>

		<?php
		include("conf_bdd2.php");
		try 
		{
			$bdd = new PDO("mysql:host=$host;dbname=$database", $username, $password);
			$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			foreach($bdd->query('SELECT anom, aprenom, amail, atel, aphoto, idform from apprenants order by idform, anom, aprenom ASC') as $row) 
			{
				
				echo '<tr>
					<td>'.$row[4].'</td><td>'.$row[0].'</td><td>'.$row[1].'</td><td>'.$row[2].'</td><td>'.$row[3].'</td><td>'.$row[5].'</td>
				</tr>';
			}
			$bdd = null;
		}
		catch (PDOException $e) 
		{
			print "Erreur !: " . $e->getMessage() . "<br/>";
			die();
		}
}
else header('location:../index.htm'); // retour à la page connexion
?>
	</tbody>
	</table>

</body>
</html>