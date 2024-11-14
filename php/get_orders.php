<?php
// get_orders.php
session_start();
require 'connection.php';

// Verificar si el usuario está autenticado
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['id_usuario'];

$stmt = $conn->prepare("SELECT id_pedido, total, fecha, productos, estado FROM pedido WHERE id_usuario = :id_usuario ORDER BY fecha DESC");
$stmt->execute(['id_usuario' => $userId]);
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($orders);