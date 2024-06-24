<?php
header('Content-Type: application/json');

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $contrasena = $_POST['password'];

    try {
        include 'connection.php';

        $stmt = $conn->prepare('SELECT * FROM usuario WHERE email = :email');
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($contrasena, $user['contrasena'])) {
            echo json_encode(['exists' => true]);
        } else {
            echo json_encode(['exists' => false]);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parametros']);
}
?>