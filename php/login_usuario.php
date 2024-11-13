<?php
header('Content-Type: application/json');
session_start();

if (isset($_POST['email']) && isset($_POST['pass'])) {
    $email = trim($_POST['email']);
    $pass = trim($_POST['pass']);

    try {
        include 'connection.php';

        // Actualiza la consulta para obtener todos los datos que necesitamos
        $stmt = $conn->prepare('SELECT id_usuario, email, nombre, password, rol, apellidos, display_name FROM usuario WHERE email = :email AND (rol != "Admin" AND rol != "Vendedor")');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica si la contraseña es correcta
        if ($result && password_verify($pass, $result['password'])) {
            // Almacena todos los datos en la sesión
            $_SESSION['user_id'] = $result['id_usuario'];
            $_SESSION['user_name'] = $result['nombre'];
            $_SESSION['user_email'] = $result['email'];
            $_SESSION['user_role'] = $result['rol'];
            $_SESSION['user_apellidos'] = $result['apellidos'];
            $_SESSION['user_display_name'] = $result['nombre'];
            
            // Respuesta de éxito
            echo json_encode(['success' => true]);
        } else {
            // Respuesta de error si la contraseña es incorrecta
            echo json_encode(['success' => false]);
        }
    } catch (PDOException $e) {
        // Enviar un mensaje de error si ocurre algún problema con la base de datos
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    // Respuesta si faltan los parámetros necesarios
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>