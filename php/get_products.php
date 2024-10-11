<?php
header('Content-Type: application/json');

include 'connectio.php';

$category = isset($_GET['category']) ? $_GET['category'] : '';

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