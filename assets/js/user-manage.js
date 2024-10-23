// Función para obtener los usuarios según el filtro seleccionado
async function filterUsers(type, order) {
    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Activar el botón clickeado
    const activeButtonId = `sort-${type === 'name' ? (order === 'asc' ? 'az' : 'za') : (order === 'asc' ? 'oldest' : 'newest')}`;
    document.getElementById(activeButtonId).classList.add('active');

    // Hacer la petición de usuarios con los nuevos parámetros
    const response = await fetch(`/pcgateway/php/get_users.php?sortType=${type}&sortOrder=${order}`);
    const usuarios = await response.json();
    
    const usuariosTable = document.getElementById('usuarios-table');
    usuariosTable.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>${usuario.fecha_creacion}</td>
            <td>
                <select onchange="updateRol(${usuario.id_usuario}, this.value)">
                    <option value="Admin" ${usuario.rol === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="Vendedor" ${usuario.rol === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                </select>
            </td>
        `;
        usuariosTable.appendChild(row);
    });
}

// Función para actualizar el rol del usuario
async function updateRol(id_usuario, nuevoRol) {
    await fetch('/pcgateway/php/user_manage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario, rol: nuevoRol }),
    });
    alert('Rol actualizado correctamente');
}

// Llamar a la función de filtro por defecto al cargar la página (A-Z)
window.onload = () => filterUsers('name', 'asc');