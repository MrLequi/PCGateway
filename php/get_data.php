<?php
include 'connection.php';

header('Content-Type: application/json');

// Cantidad de productos por página
$productsPerPage = 12;

// Validar y sanitizar la página
$page = isset($_GET['page']) && filter_var($_GET['page'], FILTER_VALIDATE_INT) ? (int)$_GET['page'] : 1;
$start = ($page - 1) * $productsPerPage;

// Sanitizar y validar las entradas
$category = isset($_GET['category']) ? htmlspecialchars(trim($_GET['category'])) : '';
$searchQuery = isset($_GET['search']) ? htmlspecialchars(trim($_GET['search'])) : '';

// Recuperar categorías
$queryCategories = $conn->prepare("SELECT * FROM `categoría`");
$queryCategories->execute();
$categories = $queryCategories->fetchAll(PDO::FETCH_ASSOC);

// Recuperar productos según la categoría o la búsqueda
$queryProducts = $conn->prepare("
    SELECT p.*, c.nombre AS categoria_nombre 
    FROM `producto` p 
    LEFT JOIN `producto_categoria` pc ON p.id_producto = pc.id_producto
    LEFT JOIN `categoría` c ON pc.id_categoría = c.id_categoría
    WHERE (:category = '' OR c.nombre = :category)
    AND (:searchQuery = '' OR p.nombre LIKE :searchPattern)
    GROUP BY p.id_producto
    LIMIT :start, :productsPerPage
");

$searchPattern = "%$searchQuery%";
$queryProducts->bindValue(':category', $category, PDO::PARAM_STR);
$queryProducts->bindValue(':searchQuery', $searchQuery, PDO::PARAM_STR);
$queryProducts->bindValue(':searchPattern', $searchPattern, PDO::PARAM_STR);
$queryProducts->bindValue(':start', $start, PDO::PARAM_INT);
$queryProducts->bindValue(':productsPerPage', $productsPerPage, PDO::PARAM_INT);
$queryProducts->execute();
$products = $queryProducts->fetchAll(PDO::FETCH_ASSOC);

// Calcular el total de productos
$queryTotal = $conn->prepare("
    SELECT COUNT(*) as total 
    FROM `producto` p 
    LEFT JOIN `producto_categoria` pc ON p.id_producto = pc.id_producto
    LEFT JOIN `categoría` c ON pc.id_categoría = c.id_categoría
    WHERE (:category = '' OR c.nombre = :category)
    AND (:searchQuery = '' OR p.nombre LIKE :searchPattern)
");
$queryTotal->bindValue(':category', $category, PDO::PARAM_STR);
$queryTotal->bindValue(':searchQuery', $searchQuery, PDO::PARAM_STR);
$queryTotal->bindValue(':searchPattern', $searchPattern, PDO::PARAM_STR);
$queryTotal->execute();
$total = $queryTotal->fetch(PDO::FETCH_ASSOC)['total'];

$response = [
    'categories' => $categories,
    'products' => $products,
    'total' => $total,
    'totalPages' => ceil($total / $productsPerPage),
];

echo json_encode($response);
?>