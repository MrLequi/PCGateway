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

        // Obtener productos sin paginación
        $stmt = $conn->prepare("SELECT p.*, c.nombre as categoria 
                                FROM producto p
                                JOIN producto_categoria pc ON p.id_producto = pc.id_producto
                                JOIN categoría c ON pc.id_categoría = c.id_categoría
                                WHERE c.id_categoría = :categoriaId");
        $stmt->bindValue(':categoriaId', $categoriaId, PDO::PARAM_INT);
        $stmt->execute();
        
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'productos' => $productos
        ]);
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
    } elseif ($action === 'getProductoById') {
        $id_producto = isset($_GET['id_producto']) ? intval($_GET['id_producto']) : 0;
        $stmt = $conn->prepare('SELECT * FROM producto WHERE id_producto = ?');
        $stmt->execute([$id_producto]);
        $producto = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($producto);
    } elseif ($action === 'updateProduct') {
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare('UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, imagen = ? WHERE id_producto = ?');
        $stmt->execute([$data['nombre'], $data['descripcion'], $data['precio'], $data['stock'], $data['categoria'], $data['imagen_url'], $data['id_producto']]);
    
        echo json_encode(['success' => true]);
    } elseif ($action === 'searchProduct') {
        $query = 'SELECT p.*, c.nombre as categoria FROM producto p JOIN producto_categoria pc ON p.id_producto = pc.id_producto JOIN categoría c ON pc.id_categoría = c.id_categoría WHERE 1=1';
    
        // Verifica cada campo y agrega una condición si el campo está lleno
        if (!empty($_GET['imagen_url'])) {
            $query .= ' AND p.imagen LIKE :imagen_url';
        }
        if (!empty($_GET['nombre'])) {
            $query .= ' AND p.nombre LIKE :nombre';
        }
        if (!empty($_GET['descripcion'])) {
            $query .= ' AND p.descripcion LIKE :descripcion';
        }
        if (!empty($_GET['precio'])) {
            $query .= ' AND p.precio = :precio';
        }
        if (!empty($_GET['stock'])) {
            $query .= ' AND p.stock = :stock';
        }
        if (!empty($_GET['categoria'])) {
            $query .= ' AND c.id_categoría = :categoria';
        }

        $stmt = $conn->prepare($query);
        
        // Vincula los parámetros según los campos llenados
        if (!empty($_GET['imagen_url'])) {
            $stmt->bindValue(':imagen_url', '%' . $_GET['imagen_url'] . '%', PDO::PARAM_STR);
        }
        if (!empty($_GET['nombre'])) {
            $stmt->bindValue(':nombre', '%' . $_GET['nombre'] . '%', PDO::PARAM_STR);
        }
        if (!empty($_GET['descripcion'])) {
            $stmt->bindValue(':descripcion', '%' . $_GET['descripcion'] . '%', PDO::PARAM_STR);
        }
        if (!empty($_GET['precio'])) {
            $stmt->bindValue(':precio', $_GET['precio'], PDO::PARAM_STR);
        }
        if (!empty($_GET['stock'])) {
            $stmt->bindValue(':stock', $_GET['stock'], PDO::PARAM_INT);
        }
        if (!empty($_GET['categoria'])) {
            $stmt->bindValue(':categoria', $_GET['categoria'], PDO::PARAM_INT);
        }

        $stmt->execute();
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['productos' => $productos]);
    } else {
        echo json_encode(['error' => 'Acción inválida']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}