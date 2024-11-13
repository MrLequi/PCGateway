<?php
require 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id_usuario = $data['id_usuario'];
$nuevo_rol = isset($data['rol']) ? $data['rol'] : null; // Verificar si existe el 'rol'
$activo = isset($data['activo']) ? $data['activo'] : null; // Verificar si existe 'activo'

// Si se está actualizando el rol
if ($nuevo_rol !== null) {
    // Actualizar el rol del usuario
    $query = $conn->prepare("UPDATE usuario SET rol = :rol WHERE id_usuario = :id_usuario");
    $query->bindParam(':rol', $nuevo_rol);
    $query->bindParam(':id_usuario', $id_usuario);
    $query->execute();
}

// Si se está actualizando el estado de actividad
if ($activo !== null) {
    // Actualizar el estado de actividad del usuario
    $query = $conn->prepare("UPDATE usuario SET activo = :activo WHERE id_usuario = :id_usuario");
    $query->bindParam(':activo', $activo, PDO::PARAM_INT);
    $query->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
    $query->execute();
}

echo json_encode(['message' => 'User updated successfully']);
?>