<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];

include 'connection.php';

// Verificar si la solicitud es para eliminar un producto
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['product_id'])) {
    // Lógica para eliminar un producto del carrito
    $product_id = $input['product_id'];

    try {
        // Obtener el id del carrito del usuario
        $query = "SELECT id_carrito FROM carrito WHERE id_usuario = :user_id LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $cart = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($cart) {
            // Eliminar el producto del detalle del carrito
            $deleteQuery = "DELETE FROM detalle_carrito WHERE id_carrito = :cart_id AND id_producto = :product_id";
            $deleteStmt = $conn->prepare($deleteQuery);
            $deleteStmt->bindParam(':cart_id', $cart['id_carrito'], PDO::PARAM_INT);
            $deleteStmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
            $deleteStmt->execute();

            if ($deleteStmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Producto eliminado del carrito']);
            } else {
                echo json_encode(['error' => 'No se pudo eliminar el producto del carrito']);
            }
        } else {
            echo json_encode(['error' => 'Carrito no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al eliminar el producto del carrito']);
    }
    exit;
}

// Si no hay solicitud de eliminación, se devuelve el carrito
try {
    // Consultar los productos del carrito del usuario
    $query = "
        SELECT p.nombre, p.precio, dc.cantidad, (p.precio * dc.cantidad) AS subtotal, p.imagen, p.id_producto
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