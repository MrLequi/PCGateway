<?php
header('Content-Type: application/json');
require 'connection.php';
session_start();

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
        $stmt = $conn->query('SELECT id, imagen FROM banner');
        $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($banners);
    } elseif ($action === 'addBanner') {
        $data = json_decode(file_get_contents('php://input'), true);
        $imagen = $data['imagen'];
        $stmt = $conn->prepare('INSERT INTO banner (imagen) VALUES (?)');
        $stmt->execute([$imagen]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'deleteBanner') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('DELETE FROM banner WHERE id = ?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Acción inválida']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}