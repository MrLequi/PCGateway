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
            <td class="ibm-plex-sans-regular">${usuario.nombre}</td>
            <td class="ibm-plex-sans-regular">${usuario.email}</td>
            <td class="ibm-plex-sans-regular">
                <select onchange="updateRol(${usuario.id_usuario}, this.value)">
                    <option value="Admin" ${usuario.rol === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="Vendedor" ${usuario.rol === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                    <option value="Usuario" ${usuario.rol === 'Usuario' ? 'selected' : ''}>Usuario</option>
                </select>
            </td>
            <td class="ibm-plex-sans-regular">${usuario.fecha_creacion}</td>
        `;
        usuariosTable.appendChild(row);
    });
}

// Función para actualizar el rol del usuario
async function updateRol(id_usuario, nuevoRol) {
    const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    });

    if (result.isConfirmed) {
        // Si el usuario confirma, realiza la solicitud para actualizar el rol
        const response = await fetch('/pcgateway/php/user_manage.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, rol: nuevoRol }),
        });

        if (response.ok) {
            Swal.fire("Saved!", "Role updated successfully", "success");
            filterUsers();
        } else {
            Swal.fire("Error", "There was an error updating the role", "error");
        }
    } else if (result.isDenied) {
        // Si el usuario selecciona "Don't save", muestra mensaje informativo
        Swal.fire("Changes are not saved", "", "info");
        filterUsers();
    }
}

// Llamar a la función de filtro por defecto al cargar la página (A-Z)
window.onload = () => filterUsers('name', 'asc');