<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil del Usuario</title>
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/perfil.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <main>
        <a href="/pcgateway/index.php" id="back-to-home">
            <i class='bx bx-left-arrow-alt'></i> Volver al Inicio
        </a>

        <section>
            <h2>Perfil de Usuario</h2>
            <div id="user-details">
                <!-- Datos del usuario -->
            </div>

            <form id="user-update-form">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre">
                <button type="submit">Actualizar Nombre</button>
            </form>

            <div id="admin-section" style="display:none;">
                <h3>Administración de Usuarios</h3>
                <button id="mostrar-usuarios-btn">Mostrar Usuarios</button>
                <table id="user-list" style="display:none;">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Aquí se cargarán usuarios -->
                    </tbody>
                </table>
            </div>

            <!-- Sección de iconos -->
            <div id="icons-section" style="display:none;">
                <!-- Los iconos se agregarán aquí por perfil.js -->
            </div>
        </section>
    </main>

    <script src="/pcgateway/assets/js/perfil.js"></script>
</body>
</html>