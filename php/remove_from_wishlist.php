<?php
session_start();
require_once 'connection.php';

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $input = json_decode(file_get_contents('php://input'), true);
    $product_id = $input['product_id'] ?? null;

    if ($product_id) {
        $stmt = $conn->prepare('DELETE FROM wishlist WHERE id_usuario = :user_id AND id_producto = :product_id');
        $stmt->execute(['user_id' => $user_id, 'product_id' => $product_id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Producto no encontrado en la wishlist']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID de producto inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}
?>