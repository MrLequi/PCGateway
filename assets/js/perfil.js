document.addEventListener("DOMContentLoaded", () => {
    // Obtener los datos del usuario cuando la página cargue
    fetch('/pcgateway/php/get_user.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            // Rellenar los campos con los datos del usuario
            document.querySelector('input[name="nombre"]').value = data.nombre;
            document.querySelector('input[name="apellidos"]').value = data.apellidos;
            document.querySelector('input[name="display_name"]').value = data.display_name;
            document.querySelector('input[name="email"]').value = data.email;
        })
        .catch(error => console.error('Error:', error));

    // Guardar cambios
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
});