<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "catalog";
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
$options = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
?>