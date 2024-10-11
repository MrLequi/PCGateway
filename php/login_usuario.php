<?php
header('Content-Type: application/json');
session_start();

if (isset($_POST['email']) && isset($_POST['pass'])) {
    $email = trim($_POST['email']);
    $pass = trim($_POST['pass']);

    try {
        include 'connection.php';

        $stmt = $conn->prepare('SELECT id_usuario, nombre, password, rol FROM usuario WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result && password_verify($pass, $result['password'])) {
            $_SESSION['user_id'] = $result['id_usuario'];
            $_SESSION['user_name'] = $result['nombre'];
            $_SESSION['user_role'] = $result['rol'];
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>