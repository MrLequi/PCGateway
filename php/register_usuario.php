<?php
header('Content-Type: application/json');

if (isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['pass'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];

    // Validación de la contraseña
    if (strlen($pass) < 8) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe tener al menos 8 caracteres.']);
        exit;
    }

    if (!preg_match('/[A-Z]/', $pass)) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe contener al menos una letra mayúscula.']);
        exit;
    }

    if (!preg_match('/[a-z]/', $pass)) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe contener al menos una letra minúscula.']);
        exit;
    }

    if (!preg_match('/[0-9]/', $pass)) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe contener al menos un número.']);
        exit;
    }

    if (!preg_match('/[\W_]/', $pass)) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe contener al menos un carácter especial.']);
        exit;
    }

    // Hashear la contraseña usando Argon2
    $pass = password_hash($pass, PASSWORD_ARGON2I);

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

        // Insertar nuevo usuario en la base de datos
        $stmt = $conn->prepare('INSERT INTO usuario (nombre, email, password) VALUES (:nombre, :email, :password)');
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pass);

        if ($stmt->execute()) {
            // Si la inserción fue exitosa, enviar el correo de confirmación
            if (sendConfirmationEmail($email, $nombre)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Registro exitoso pero no se pudo enviar el correo']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al ejecutar la consulta']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}

// Función para enviar el correo de confirmación usando mail()
function sendConfirmationEmail($email, $nombre) {
    $to = $email;
    $subject = 'Confirmación de Registro | PCGateway';
    $message = "Hola $nombre,\n\nGracias por registrarte en nuestro sitio. Haz clic en el siguiente enlace para confirmar tu registro:\nhttp://localhost/pcgateway/confirmar?email=$email";
    $headers = 'From: lequinidylan@gmail.com' . "\r\n" .
               'Reply-To: lequinidylan@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    return mail($to, $subject, $message, $headers);
}