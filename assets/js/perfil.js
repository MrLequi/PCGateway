document.addEventListener("DOMContentLoaded", () => {
    // Obtener los datos del usuario cuando la página cargue
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                console.error('Usuario no autenticado.');
                return;
            }

            // Rellenar los campos con los datos del usuario
            document.querySelector('input[name="nombre"]').value = data.userName;
            document.querySelector('input[name="apellidos"]').value = data.userApellidos;
            document.querySelector('input[name="display_name"]').value = data.userDisplayName;
            document.querySelector('input[name="email"]').value = data.userEmail;
        })
        .catch(error => console.error('Error al obtener los datos del usuario:', error));

    // Guardar cambios del formulario
    document.querySelector('#profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Enviar los datos al backend para actualizar el perfil
        fetch('/pcgateway/php/update_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            messageDiv.style.display = 'block'; // Mostrar el mensaje

            if (data.error) {
                console.error(data.error);
                messageDiv.textContent = data.error; // Mostrar el mensaje de error
                messageDiv.classList.add('error');
                messageDiv.classList.remove('success');
            } else {
                console.log(data.success);
                messageDiv.textContent = data.success; // Mostrar el mensaje de éxito
                messageDiv.classList.add('success');
                messageDiv.classList.remove('error');

                // Mostrar mensaje específico para cambio de contraseña
                if (data.password_change) {
                    messageDiv.textContent += ' ' + data.password_change; // Añadir el mensaje de cambio de contraseña
                }
            }
        })
        .catch(error => {
            const messageDiv = document.getElementById('message');
            messageDiv.style.display = 'block'; // Mostrar el mensaje
            messageDiv.textContent = 'An error occurred. Please try again.'; // Mensaje genérico de error
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
            console.error('Error:', error);
        });
    });

    // Obtener el estado de la sesión y el rol del usuario
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                console.error('Usuario no autenticado.');
                return;
            }

            // Mostrar contenido basado en el rol
            const userRole = data.userRole;
            const manageSection = document.querySelector('.manage');
            const settingsLink = manageSection.querySelector('.settings');
            const userManageLink = manageSection.querySelector('.user_manage');

            if (userRole === 'Admin') {
                // Mostrar toda la sección para Admin
                manageSection.style.display = 'block';
            } else if (userRole === 'Vendedor') {
                // Mostrar solo Products y Catalog para Vendedor
                manageSection.style.display = 'block';
                if (settingsLink) settingsLink.style.display = 'none';
                if (userManageLink) userManageLink.style.display = 'none';
            }
        })
        .catch(error => console.error('Error al obtener el estado de la sesión:', error));
});