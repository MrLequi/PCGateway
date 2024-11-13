<?php
header('Content-Type: application/json');
include 'connection.php';

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    try {
        $stmt = $conn->prepare('UPDATE usuario SET activo = 1 WHERE email = :email');
        $stmt->bindParam(':email', $email);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Cuenta confirmada con éxito.']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al confirmar la cuenta.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Parámetros insuficientes']);
}
?>