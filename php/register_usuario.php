<?php
header('Content-Type: application/json');

if (isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['pass'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['pass'], PASSWORD_ARGON2I);

    try {
        include 'connection.php';

        // Verificar si el correo electrónico ya existe
        $checkEmailStmt = $conn->prepare('SELECT email FROM usuario WHERE email = :email');
        $checkEmailStmt->bindParam(':email', $email);
        $checkEmailStmt->execute();

        if ($checkEmailStmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
            exit;
        }

        // Insertar nuevo usuario
        $stmt = $conn->prepare('INSERT INTO usuario (nombre, email, password) VALUES (:nombre, :email, :password)');
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pass);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            error_log("Error al ejecutar la consulta: " . print_r($stmt->errorInfo(), true));
            echo json_encode(['success' => false, 'error' => 'Error al ejecutar la consulta']);
        }
    } catch (PDOException $e) {
        error_log("Error en la base de datos: " . $e->getMessage());
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>