<?php
require 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id_usuario = $data['id_usuario'];
$nuevo_rol = $data['rol'];

// Actualizar el rol del usuario
$query = $conn->prepare("UPDATE usuario SET rol = :rol WHERE id_usuario = :id_usuario");
$query->bindParam(':rol', $nuevo_rol);
$query->bindParam(':id_usuario', $id_usuario);
$query->execute();

echo json_encode(['message' => 'Rol actualizado correctamente']);
?>