<?php 
header('Content-Type: application/json');
session_start();

$response = [
    'loggedIn' => isset($_SESSION['user_name']),
    'userName' => $_SESSION['user_name'] ?? '',
    'userId' => $_SESSION['user_id'] ?? '',
    'userEmail' => $_SESSION['user_email'] ?? '',
    'userApellidos' => $_SESSION['user_apellidos'] ?? '',
    'userDisplayName' => $_SESSION['user_display_name'] ?? ''
];

echo json_encode($response);
?>