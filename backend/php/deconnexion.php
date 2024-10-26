<?php
session_start();
unset($_SESSION['idu']);
unset($_SESSION['idf']);
session_destroy();
header('Location: https://localhost:5173'); // Rediriger vers la page de connexion de l'application React
exit();
?>