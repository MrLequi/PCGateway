<?php
session_start();
require_once 'connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);
$product_name = $data['product'] ?? null;

if (!$product_name) {
    echo json_encode(['success' => false, 'message' => 'Producto no especificado']);
    exit;
}

try {
    // Obtener el id del producto basado en el nombre
    $stmt = $conn->prepare('SELECT id_producto FROM producto WHERE nombre = ?');
    $stmt->execute([$product_name]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
        exit;
    }

    $product_id = $product['id_producto'];

    // Verificar si el producto ya está en la wishlist
    $checkStmt = $conn->prepare('SELECT * FROM wishlist WHERE id_usuario = ? AND id_producto = ?');
    $checkStmt->execute([$user_id, $product_id]);

    if ($checkStmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'El producto ya está en la wishlist']);
        exit;
    }

    // Insertar el producto en la wishlist
    $insertStmt = $conn->prepare('INSERT INTO wishlist (id_usuario, id_producto) VALUES (?, ?)');
    $insertStmt->execute([$user_id, $product_id]);

    echo json_encode(['success' => true, 'message' => 'Producto añadido a la wishlist']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al añadir el producto a la wishlist: ' . $e->getMessage()]);
}