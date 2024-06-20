<?php
include "connection.php";

try {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $contrasena = $_POST['password'];

    $contrasena_encriptada = password_hash($contrasena, PASSWORD_ARGON2I);

    $sql_verificar = "SELECT COUNT(*) FROM usuario WHERE email = :email";
    $stmt_verificar = $conn->prepare($sql_verificar);
    $stmt_verificar->bindParam(':email', $email);
    $stmt_verificar->execute();
    $email_exists = $stmt_verificar->fetchColumn();

    if ($email_exists > 0) {
        echo '
        <script>
            alert("Este correo ya está registrado, intenta con otro diferente");
        </script>
        ';
        exit();
    }

    $sql = "INSERT INTO usuario (nombre, email, contrasena) 
            VALUES (:nombre, :email, :contrasena)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':contrasena', $contrasena_encriptada);
    $executionResult = $stmt->execute();

    if ($executionResult) {
        echo '
        <script>
            alert("Usuario almacenado exitosamente");
        </script>
        ';
    } else {
        echo '
        <script>
            alert("Intentelo de nuevo, Usuario no almacenado");
        </script>
        ';
    }
} catch (PDOException $e) {
    echo "Error: ('{$e->getMessage()}')\n{$e}\n";
    $executionResult = false;
}
?>