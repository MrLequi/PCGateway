document.addEventListener('DOMContentLoaded', function () {
    // Obtener los detalles del usuario autenticado
    fetch('/pcgateway/php/user_management.php?action=getUserData')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mostrar los datos del usuario
                document.getElementById('user-details').innerHTML = `
                    <p><strong>Nombre:</strong> ${data.user.nombre}</p>
                    <p><strong>Email:</strong> ${data.user.email}</p>
                    <p><strong>Rol:</strong> ${data.user.rol}</p>
                `;
                document.getElementById('nombre').value = data.user.nombre;

                // Si es Admin, mostrar la sección de administración de usuarios
                if (data.user.rol === 'Admin') {
                    document.getElementById('admin-section').style.display = 'block';

                    // Agregar evento al botón "Mostrar Usuarios"
                    document.getElementById('mostrar-usuarios-btn').addEventListener('click', function() {
                        cargarUsuarios();
                        document.getElementById('user-list').style.display = 'table';
                    });

                    // Mostrar los iconos de administración en la sección
                    document.getElementById('icons-section').innerHTML = `
                        <a href="/pcgateway/pages/configuracion.html"><i class="bx bx-cog"></i> Configuración</a>
                        <a href="/pcgateway/pages/productos.html"><i class="bx bxs-package"></i> Productos</a>
                    `;
                    document.getElementById('icons-section').style.display = 'block';
                } else if (data.user.rol === 'Vendedor') {
                    // Mostrar solo el icono de productos para Vendedor
                    document.getElementById('icons-section').innerHTML = `
                        <a href="/pcgateway/pages/productos.html"><i class="bx bxs-package"></i> Productos</a>
                    `;
                    document.getElementById('icons-section').style.display = 'block';
                }
            }
        });

    // Actualizar el nombre del usuario
    document.getElementById('user-update-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;

        fetch('/pcgateway/php/user_management.php?action=updateName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nombre }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Nombre actualizado exitosamente');
                location.reload();
            }
        });
    });
});

// Función para cargar la lista de usuarios
function cargarUsuarios() {
    fetch('/pcgateway/php/user_management.php?action=getAllUsers')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const userList = document.getElementById('user-list').querySelector('tbody');
                userList.innerHTML = ''; // Limpiar lista de usuarios

                data.users.forEach(user => {
                    userList.innerHTML += `
                        <tr>
                            <td>${user.nombre}</td>
                            <td>${user.email}</td>
                            <td>
                                <select data-user-id="${user.id}" onchange="cambiarRol(this)">
                                    <option value="Usuario" ${user.rol === 'Usuario' ? 'selected' : ''}>Usuario</option>
                                    <option value="Vendedor" ${user.rol === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                                    <option value="Admin" ${user.rol === 'Admin' ? 'selected' : ''}>Admin</option>
                                </select>
                            </td>
                            <td><button onclick="eliminarUsuario(${user.id})">Eliminar</button></td>
                        </tr>
                    `;
                });
            }
        });
}

// Función para cambiar el rol de un usuario
function cambiarRol(selectElement) {
    const userId = selectElement.getAttribute('data-user-id');
    const nuevoRol = selectElement.value;

    fetch('/pcgateway/php/user_management.php?action=updateUserRole', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, rol: nuevoRol }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Rol actualizado exitosamente');
        }
    });
}

// Función para eliminar un usuario
function eliminarUsuario(userId) {
    fetch('/pcgateway/php/user_management.php?action=deleteUser', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario eliminado exitosamente');
            cargarUsuarios();
        }
    });
}