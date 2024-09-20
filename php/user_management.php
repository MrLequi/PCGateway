<?php
header('Content-Type: application/json');
session_start();
include 'connection.php';

// Obtener datos de la solicitud (puede ser GET, POST, etc.)
$method = $_SERVER['REQUEST_METHOD'];

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_name'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

// Obtener la acción desde los parámetros GET o el cuerpo JSON (si es POST/PUT)
$action = isset($_GET['action']) ? $_GET['action'] : null;
$input = json_decode(file_get_contents('php://input'), true);

// Seleccionar la acción a realizar
switch ($action) {
    case 'getUserData':
        getUserData();
        break;

    case 'updateName':
        updateUserName($input);
        break;

    case 'getAllUsers':
        getAllUsers();
        break;

    case 'updateUserRole':
        updateUserRole($input);
        break;

    case 'deleteUser':
        deleteUser($input['id']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        break;
}

// Función para obtener los datos del usuario autenticado
function getUserData() {
    global $conn;
    $stmt = $conn->prepare('SELECT nombre, email, rol FROM usuario WHERE nombre = :nombre');
    $stmt->bindParam(':nombre', $_SESSION['user_name']);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        // Guardar el rol del usuario en la sesión para verificar en otras funciones
        $_SESSION['user_role'] = $user['rol'];
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
    }
}

// Función para actualizar el nombre del usuario autenticado
function updateUserName($input) {
    global $conn;
    if (isset($input['nombre'])) {
        $nuevoNombre = trim($input['nombre']);
        $stmt = $conn->prepare('UPDATE usuario SET nombre = :nombre WHERE nombre = :old_nombre');
        $stmt->bindParam(':nombre', $nuevoNombre);
        $stmt->bindParam(':old_nombre', $_SESSION['user_name']);

        if ($stmt->execute()) {
            $_SESSION['user_name'] = $nuevoNombre;
            echo json_encode(['success' => true, 'message' => 'Nombre actualizado']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar nombre']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Nombre no proporcionado']);
    }
}

// Función para obtener la lista de todos los usuarios (solo para administradores)
function getAllUsers() {
    global $conn;
    if ($_SESSION['user_role'] === 'Admin') {
        $stmt = $conn->prepare('SELECT id, nombre, email, rol FROM usuario');
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'users' => $users]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No autorizado']);
    }
}

// Función para actualizar el rol de un usuario (solo para administradores)
function updateUserRole($input) {
    global $conn;
    if ($_SESSION['user_role'] === 'Admin' && isset($input['id']) && isset($input['rol'])) {
        $userId = $input['id'];
        $nuevoRol = $input['rol'];

        $stmt = $conn->prepare('UPDATE usuario SET rol = :rol WHERE id = :id');
        $stmt->bindParam(':rol', $nuevoRol);
        $stmt->bindParam(':id', $userId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Rol actualizado']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar rol']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No autorizado o datos incompletos']);
    }
}

// Función para eliminar un usuario (solo para administradores)
function deleteUser($userId) {
    global $conn;
    if ($_SESSION['user_role'] === 'Admin') {
        $stmt = $conn->prepare('DELETE FROM usuario WHERE id = :id');
        $stmt->bindParam(':id', $userId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Usuario eliminado']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar usuario']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No autorizado']);
    }
}
?>