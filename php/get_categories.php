<?php
header('Content-Type: application/json');

include 'connection.php';

try {
    $stmt = $conn->query("SELECT id_categoría, nombre FROM Categoría");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['categories' => $categories]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>