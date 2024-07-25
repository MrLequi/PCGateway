<?php
ini_set('log_errors', 1);
ini_set('error_log', 'error_log.txt');

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tiendadb";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log("Error de conexión: " . $e->getMessage());
    die("Error de conexión: " . $e->getMessage());
}
?>