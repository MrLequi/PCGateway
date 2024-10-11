<?php
session_start();
include 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$productName = $data['product'];
$quantity = $data['quantity'];

if ($productName && $quantity) {
    $query = $conn->prepare("SELECT id_producto FROM producto WHERE nombre = :nombre");
    $query->bindParam(':nombre', $productName);
    $query->execute();
    $product = $query->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        $productId = $product['id_producto'];
        $userId = $_SESSION['user_id'];

        // Verificar si el carrito ya existe para el usuario
        $query = $conn->prepare("SELECT id_carrito FROM carrito WHERE id_usuario = :user_id");
        $query->bindParam(':user_id', $userId);
        $query->execute();
        $cart = $query->fetch(PDO::FETCH_ASSOC);

        if (!$cart) {
            // Crear un nuevo carrito si no existe
            $query = $conn->prepare("INSERT INTO carrito (id_usuario) VALUES (:user_id)");
            $query->bindParam(':user_id', $userId);
            $query->execute();
            $cartId = $conn->lastInsertId();
        } else {
            $cartId = $cart['id_carrito'];
        }

        // Insertar o actualizar el producto en el carrito
        $query = $conn->prepare("
            INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad) 
            VALUES (:cart_id, :product_id, :quantity)
            ON DUPLICATE KEY UPDATE cantidad = cantidad + :quantity
        ");
        $query->bindParam(':cart_id', $cartId);
        $query->bindParam(':product_id', $productId);
        $query->bindParam(':quantity', $quantity);
        $query->execute();

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>