<?php
header('Content-Type: application/json');
session_start();
require 'connection.php';

// Verificar que el usuario esté autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = isset($_GET['action']) ? $_GET['action'] : ''; // Obtener la acción solicitada

try {
    if ($action === 'loadCart') {
        // Consultar los productos del carrito del usuario
        $query = "
            SELECT p.nombre, p.precio, dc.cantidad, (p.precio * dc.cantidad) AS subtotal, p.imagen, p.id_producto, dc.id_carrito
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

    } elseif ($action === 'removeProduct') {
        $input = json_decode(file_get_contents('php://input'), true);
        $product_id = $input['product_id'];

        $query = "SELECT id_carrito FROM carrito WHERE id_usuario = :user_id LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $cart = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($cart) {
            $deleteQuery = "DELETE FROM detalle_carrito WHERE id_carrito = :cart_id AND id_producto = :product_id";
            $deleteStmt = $conn->prepare($deleteQuery);
            $deleteStmt->bindParam(':cart_id', $cart['id_carrito'], PDO::PARAM_INT);
            $deleteStmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
            $deleteStmt->execute();

            echo json_encode(['success' => $deleteStmt->rowCount() > 0]);
        } else {
            echo json_encode(['error' => 'Carrito no encontrado']);
        }

    } elseif ($action === 'updateQuantity') {
        $input = json_decode(file_get_contents('php://input'), true);
        $product_id = $input['product_id'];
        $new_quantity = $input['new_quantity'];
        $cart_id = $input['cart_id'];

        $updateQuery = "UPDATE detalle_carrito SET cantidad = :new_quantity WHERE id_carrito = :cart_id AND id_producto = :product_id";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bindParam(':new_quantity', $new_quantity, PDO::PARAM_INT);
        $updateStmt->bindParam(':cart_id', $cart_id, PDO::PARAM_INT);
        $updateStmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $updateStmt->execute();

        echo json_encode(['success' => $updateStmt->rowCount() > 0]);
    } else {
        echo json_encode(['error' => 'Acción inválida']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
}
?>