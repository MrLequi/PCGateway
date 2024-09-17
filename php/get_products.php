<?php
header('Content-Type: application/json');

include 'connectio.php';

// Obtén la categoría del parámetro GET
$category = isset($_GET['category']) ? $_GET['category'] : '';

// Consulta a la base de datos
$query = 'SELECT * FROM producto WHERE categoria = :category';
$stmt = $conn->prepare($query);
$stmt->execute(['category' => $category]);

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($products) {
    echo json_encode(['success' => true, 'products' => $products]);
} else {
    echo json_encode(['success' => false]);
}
?>