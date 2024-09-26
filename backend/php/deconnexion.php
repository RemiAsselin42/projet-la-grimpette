<?php
    unset($_SESSION['idu']);
	unset($_SESSION['idf']);
    session_destroy();  
    header('location:../index.htm'); 
?>