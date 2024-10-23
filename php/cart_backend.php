<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];

include 'connection.php';

try {
    // Consultar el carrito del usuario
    $query = "
        SELECT p.nombre, p.precio, dc.cantidad, (p.precio * dc.cantidad) AS subtotal, p.imagen
        FROM detalle_carrito dc
        JOIN producto p ON dc.id_producto = p.id_producto
        JOIN carrito c ON dc.id_carrito = c.id_carrito
        WHERE c.id_usuario = :user_id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$cartItems) {
        echo json_encode(['empty' => true, 'message' => 'El carrito está vacío']);
    } else {
        echo json_encode(['empty' => false, 'items' => $cartItems]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener los productos del carrito']);
}
?>