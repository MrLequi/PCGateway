<?php
session_start();

// Incluir el archivo de conexión
include 'connection.php';  // Asegúrate de que la ruta es correcta

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

// Obtener el ID del usuario de la sesión
$user_id = $_SESSION['user_id'];

// Preparar la consulta utilizando el nombre correcto de la columna (id_usuario)
$stmt = $conn->prepare("SELECT nombre, apellidos, display_name, email FROM usuario WHERE id_usuario = :id_usuario");
$stmt->execute(['id_usuario' => $user_id]);

// Obtener los datos del usuario
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Verificar si se encontraron los datos
if ($user) {
    echo json_encode($user);
} else {
    echo json_encode(['error' => 'User not found']);
}
?>