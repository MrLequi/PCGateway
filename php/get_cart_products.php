<?php
header('Content-Type: application/json');
require 'connectio.php';

$cart = json_decode(file_get_contents('php://input'), true)['cart'];

if (empty($cart)) {
    echo json_encode(['products' => []]);
    exit;
}

$placeholders = implode(',', array_fill(0, count($cart), '?'));
$query = "SELECT id_producto, nombre, precio, imagen FROM producto WHERE id_producto IN ($placeholders)";
$stmt = $pdo->prepare($query);
$stmt->execute(array_keys($cart));

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['products' => $products]);
?>