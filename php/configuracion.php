<?php
header('Content-Type: application/json');
require 'connection.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    if ($action === 'getConfig') {
        $stmt = $conn->query('SELECT * FROM Configuracion LIMIT 1');
        $config = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($config);
    } elseif ($action === 'updateConfig') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('UPDATE Configuracion SET nombre_empresa = ?, telefono = ?, email = ?, direccion = ? WHERE nombre_empresa = "PCGateway"');
        $stmt->execute([
            $data['nombre_empresa'],
            $data['telefono'],
            $data['email'],
            $data['direccion'],
        ]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'getBanners') {
        $stmt = $conn->query('SELECT * FROM Banner');
        $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($banners);
    } elseif ($action === 'addBanner') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('INSERT INTO Banner (url) VALUES (?)');
        $stmt->execute([$data['url']]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'deleteBanner') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('DELETE FROM Banner WHERE id = ?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'getProducts') {
        $stmt = $conn->query('SELECT * FROM Producto');
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    } elseif ($action === 'addProduct') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('INSERT INTO Producto (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['nombre'],
            $data['descripcion'],
            $data['precio'],
            $data['stock'],
            $data['categoria'],
        ]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'deleteProduct') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('DELETE FROM Producto WHERE id = ?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Invalid action']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>