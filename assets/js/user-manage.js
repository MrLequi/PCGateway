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
                    <option value="Seller" ${usuario.rol === 'Seller' ? 'selected' : ''}>Seller</option>
                    <option value="User" ${usuario.rol === 'User' ? 'selected' : ''}>User</option>
                </select>
            </td>
            <td>
                <select onchange="updateActivity(${usuario.id_usuario}, this.value)">
                    <option value="1" ${usuario.activo === '1' ? 'selected' : ''}>Yes</option>
                    <option value="0" ${usuario.activo === '0' ? 'selected' : ''}>No</option>
                </select>
            </td>
            <td class="ibm-plex-sans-regular">${usuario.fecha_creacion}</td>
        `;
        usuariosTable.appendChild(row);
    });
}

// Función para actualizar el estado de actividad del usuario
async function updateActivity(id_usuario, nuevoEstado) {
    const result = await Swal.fire({
        title: "Do you want to change the activity status?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    });

    if (result.isConfirmed) {
        // Si el usuario confirma, realiza la solicitud para actualizar el estado de actividad
        const response = await fetch('/pcgateway/php/user_manage.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, activo: nuevoEstado }),
        });

        if (response.ok) {
            Swal.fire("Saved!", "Activity status updated successfully", "success");
            filterUsers();
        } else {
            Swal.fire("Error", "There was an error updating the activity status", "error");
        }
    } else if (result.isDenied) {
        // Si el usuario selecciona "Don't save", muestra mensaje informativo
        Swal.fire("Changes are not saved", "", "info");
        filterUsers();
    }
}

// Función para actualizar el rol del usuario
async function updateRol(id_usuario, nuevoRol) {
    if (!nuevoRol) {
        Swal.fire("Error", "Role is required", "error");
        return;
    }

    const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    });

    if (result.isConfirmed) {
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
        Swal.fire("Changes are not saved", "", "info");
        filterUsers();
    }
}

// Función para abrir el popup
function openAddUserPopup() {
    document.getElementById('addUserPopup').style.display = 'flex';
}

// Función para cerrar el popup
function closeAddUserPopup() {
    document.getElementById('addUserPopup').style.display = 'none';
}

// Función para agregar un usuario
async function addUser() {
    const form = document.getElementById('addUserForm');
    const formData = new FormData(form);

    const response = await fetch('/pcgateway/php/register_usuario.php', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (result.success) {
        Swal.fire('Success', 'User added successfully', 'success');
        closeAddUserPopup();
        filterUsers(); // Recargar usuarios
    } else {
        Swal.fire('Error', result.error || 'Error adding user', 'error');
    }
}

// Llamar a la función de filtro por defecto al cargar la página (A-Z)
window.onload = () => filterUsers('name', 'asc');