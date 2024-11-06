<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

// Verificar que los datos se hayan enviado
if (!isset($_POST['nombre'], $_POST['apellidos'], $_POST['display_name'], $_POST['email'])) {
    echo json_encode(['error' => 'Incomplete data']);
    exit();
}

// Conectar a la base de datos
include 'connection.php';

// Obtener el ID del usuario de la sesión
$user_id = $_SESSION['user_id'];

// Actualizar datos del usuario (nombre, apellidos, display_name y email)
$stmt = $conn->prepare("UPDATE usuario SET nombre = :nombre, apellidos = :apellidos, display_name = :display_name, email = :email WHERE id_usuario = :id_usuario");
$result = $stmt->execute([
    'nombre' => $_POST['nombre'],
    'apellidos' => $_POST['apellidos'],
    'display_name' => $_POST['display_name'],
    'email' => $_POST['email'],
    'id_usuario' => $user_id
]);

// Si se ha enviado una nueva contraseña, verificar y actualizar
if (!empty($_POST['current_password']) && !empty($_POST['new_password']) && !empty($_POST['confirm_new_password'])) {
    // Obtener la contraseña actual del usuario desde la base de datos
    $stmt = $conn->prepare("SELECT password FROM usuario WHERE id_usuario = :id_usuario");
    $stmt->execute(['id_usuario' => $user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($_POST['current_password'], $user['password'])) {
        echo json_encode(['error' => 'Current password is incorrect']);
        exit();
    }

    // Verificar que las nuevas contraseñas coincidan
    if ($_POST['new_password'] !== $_POST['confirm_new_password']) {
        echo json_encode(['error' => 'New passwords do not match']);
        exit();
    }

    // Hash de la nueva contraseña
    $newPasswordHash = password_hash($_POST['new_password'], PASSWORD_ARGON2ID);

    // Actualizar la contraseña en la base de datos
    $stmt = $conn->prepare("UPDATE usuario SET password = :new_password WHERE id_usuario = :id_usuario");
    $stmt->execute([
        'new_password' => $newPasswordHash,
        'id_usuario' => $user_id
    ]);
}

// Si la actualización fue exitosa, actualiza los datos en la sesión
if ($result) {
    // Actualizar los datos en la sesión con los valores de $_POST
    $_SESSION['user_name'] = $_POST['nombre'];
    $_SESSION['user_email'] = $_POST['email'];
    $_SESSION['user_apellidos'] = $_POST['apellidos'];
    $_SESSION['user_display_name'] = $_POST['display_name'];

    echo json_encode(['success' => 'User updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update user']);
}
?>