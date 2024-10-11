<?php
header('Content-Type: application/json');
require 'connection.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    if ($action === 'getCategorias') {
        $stmt = $conn->query('SELECT * FROM categoría');
        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($categorias);
    } elseif ($action === 'getProductos') {
        $categoriaId = isset($_GET['categoriaId']) ? intval($_GET['categoriaId']) : 0;
        $stmt = $conn->prepare('SELECT p.*, c.nombre as categoria FROM producto p
                                JOIN producto_categoria pc ON p.id_producto = pc.id_producto
                                JOIN categoría c ON pc.id_categoría = c.id_categoría
                                WHERE c.id_categoría = ?');
        $stmt->execute([$categoriaId]);
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($productos);
    } elseif ($action === 'addProduct') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('INSERT INTO producto (nombre, descripcion, precio, stock, categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$data['nombre'], $data['descripcion'], $data['precio'], $data['stock'], $data['categoria'], $data['imagen_url']]);
        $lastId = $conn->lastInsertId();

        $stmt = $conn->prepare('INSERT INTO producto_categoria (id_producto, id_categoría) VALUES (?, ?)');
        $stmt->execute([$lastId, $data['categoria']]);

        echo json_encode(['success' => true, 'categoria' => $data['categoria']]);
    } elseif ($action === 'deleteProduct') {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $conn->prepare('DELETE FROM producto_categoria WHERE id_producto = ?');
        $stmt->execute([$data['id']]);

        $stmt = $conn->prepare('DELETE FROM producto WHERE id_producto = ?');
        $stmt->execute([$data['id']]);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Acción inválida']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}