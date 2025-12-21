<?php
$conn = new mysqli('MySQL-8.0', 'root', "", 'kval_db');

if($conn->connect_error){
    die("error db");
}

?>