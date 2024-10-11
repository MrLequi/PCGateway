<?php
include 'connection.php';

try {
    $stmt = $conn->query("SELECT imagen FROM banner");
    $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($banners);
} catch (PDOException $e) {
    error_log("Error en la consulta: " . $e->getMessage());
    echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
}
?>