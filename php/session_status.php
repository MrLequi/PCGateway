<?php
header('Content-Type: application/json');
session_start();

$response = [
    'loggedIn' => isset($_SESSION['user_name']),
    'userName' => $_SESSION['user_name'] ?? '',
    'userRole' => $_SESSION['user_role'] ?? ''
];

echo json_encode($response);
?>