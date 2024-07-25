<?php
header('Content-Type: application/json');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_destroy();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>