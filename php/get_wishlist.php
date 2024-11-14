<?php
session_start();
require_once 'connection.php';

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $stmt = $conn->prepare('
        SELECT p.id_producto, p.nombre, p.precio, p.imagen 
        FROM wishlist w 
        INNER JOIN producto p ON w.id_producto = p.id_producto 
        WHERE w.id_usuario = :user_id
    ');
    $stmt->execute(['user_id' => $user_id]);
    $wishlistItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'items' => $wishlistItems]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}
?>