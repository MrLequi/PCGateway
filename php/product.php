<?php
include 'connection.php';

$productName = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : '';

if ($productName) {
    file_put_contents('debug_log.txt', 'Nombre recibido: ' . $productName . "\n", FILE_APPEND);
    
    $query = $conn->prepare("
        SELECT p.*, c.nombre AS categoria_nombre 
        FROM producto p 
        JOIN producto_categoria pc ON p.id_producto = pc.id_producto 
        JOIN categoría c ON pc.id_categoría = c.id_categoría 
        WHERE p.nombre LIKE :nombre
    ");
    $productNameLike = "%$productName%";
    $query->bindParam(':nombre', $productNameLike, PDO::PARAM_STR);
    $query->execute();
    $product = $query->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode([
            'success' => true,
            'product' => [
                'nombre' => $product['nombre'],
                'descripcion' => $product['descripcion'],
                'precio' => $product['precio'],
                'stock' => $product['stock'],
                'imagen' => $product['imagen'],
                'categoria' => $product['categoria_nombre']
            ]
        ]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>