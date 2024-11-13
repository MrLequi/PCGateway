<?php
session_start();
require_once 'connection.php';

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Guardar el pedido en la base de datos y devolver éxito
    // Validación de datos del pedido
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['total']) || !isset($data['productos'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit;
    }

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
        exit;
    }

    $id_usuario = $_SESSION['user_id'];
    $total = $data['total'];
    $productos = json_encode($data['productos'], JSON_UNESCAPED_UNICODE);
    $estado = 'pendiente';

    try {
        // Iniciar la transacción
        $conn->beginTransaction();

        // Insertar pedido
        $stmt = $conn->prepare('INSERT INTO pedido (id_usuario, total, fecha, productos, estado) VALUES (?, ?, NOW(), ?, ?)');
        $stmt->execute([$id_usuario, $total, $productos, $estado]);

        $id_pedido = $conn->lastInsertId();

        // Actualizar stock de productos
        foreach ($data['productos'] as $producto) {
            $id_producto = $producto['nombre'];
            $cantidad = $producto['cantidad'];

            // Actualizar el stock
            $stmt = $conn->prepare('UPDATE producto SET stock = stock - ? WHERE nombre = ?');
            $stmt->execute([$cantidad, $id_producto]);
        }

        // Eliminar productos del carrito
        $stmt = $conn->prepare('DELETE FROM detalle_carrito WHERE id_carrito = (SELECT id_carrito FROM carrito WHERE id_usuario = ?)');
        $stmt->execute([$id_usuario]);

        // Confirmar la transacción
        $conn->commit();

        echo json_encode(['success' => true, 'message' => 'Order stored and cart cleared successfully']);
    } catch (PDOException $e) {
        // Si ocurre un error, revertir la transacción
        $conn->rollBack();
        echo json_encode(['success' => false, 'message' => 'Error storing order: ' . $e->getMessage()]);
    }
} elseif (isset($_GET['action']) && $_GET['action'] === 'getOrderSummary') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
        exit;
    }

    $id_usuario = $_SESSION['user_id'];

    try {
        // Consultar el último pedido del usuario
        $stmt = $conn->prepare('
            SELECT p.id_pedido, p.total, p.productos, p.fecha
            FROM pedido p
            WHERE p.id_usuario = ? AND p.estado = "pendiente"
            ORDER BY p.fecha DESC LIMIT 1
        ');
        $stmt->execute([$id_usuario]);
        $pedido = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$pedido) {
            echo json_encode(['success' => false, 'message' => 'No pending order found']);
            exit;
        }

        // Obtener los productos del pedido (deserializar el campo JSON 'productos')
        $productos = json_decode($pedido['productos'], true);

        // Preparar la respuesta con los datos reales del pedido
        echo json_encode([
            'success' => true,
            'orderId' => $pedido['id_pedido'],
            'total' => $pedido['total'],
            'productos' => $productos
        ]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error retrieving order summary: ' . $e->getMessage()]);
    }
}
?>