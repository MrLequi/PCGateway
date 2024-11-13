<?php
require 'connection.php';

$sortType = isset($_GET['sortType']) && $_GET['sortType'] === 'date' ? 'fecha_creacion' : 'nombre';
$sortOrder = isset($_GET['sortOrder']) && $_GET['sortOrder'] === 'desc' ? 'DESC' : 'ASC';

// Consulta para obtener usuarios ordenados por nombre o fecha de creación
$query = $conn->prepare("SELECT id_usuario, nombre, email, rol, fecha_creacion, activo FROM usuario ORDER BY $sortType $sortOrder");
$query->execute();
$usuarios = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($usuarios);
?>