<?php
    header('Content-Type: application/json');

    if(isset($_POST['email']) && isset($POST['password'])){
        include 'connection.php';

        $email = $_POST['email'];
        $contrasena = $_POST['password'];

        try {
            $stmt = $pdo->prepare('SELECT * FROM usuario WHERE email = :email AND contrasena = :contrasena');
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':contrasena', $contrasena);
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
                header("Location: ../index.php");
                exit();
            } else {
                echo '
                <script>
                    alert("Usuario no existe, por favor verifique los datos introducidos");
                </script>
                ';
                exit();
            }
        } catch (PDOException $e) {
            echo "Error: ('{$e->getMessage()}')\n{$e}\n";
        }
    }
?>