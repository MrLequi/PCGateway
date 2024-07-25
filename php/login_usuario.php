<?php
header('Content-Type: application/json');
session_start();

if (isset($_POST['email']) && isset($_POST['pass'])) {
    $email = $_POST['email'];
    $pass = $_POST['pass'];

    try {
        include 'connection.php';

        $stmt = $conn->prepare('SELECT nombre, password FROM usuario WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result && password_verify($pass, $result['password'])) {
            $_SESSION['user_name'] = $result['nombre'];
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