<?php
header('Content-Type: application/json');

if (isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['rol'])) {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['pass'], PASSWORD_ARGON2I);
    $rol = $_POST['rol'];
    $activo = $_POST['activo'] ?? 1;

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
        $stmt = $conn->prepare('INSERT INTO usuario (nombre, apellidos, email, rol, password, activo) VALUES (:nombre, :apellidos, :email, :rol, :password, :activo)');
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':rol', $rol);
        $stmt->bindParam(':password', $pass);
        $stmt->bindParam(':activo', $activo, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al ejecutar la consulta']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Faltan parámetros']);
}
?>