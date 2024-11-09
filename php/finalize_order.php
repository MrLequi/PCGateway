<?php
session_start();
require_once 'connection.php';

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['total']) || !isset($data['productos'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
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