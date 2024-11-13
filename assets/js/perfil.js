document.addEventListener("DOMContentLoaded", () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // Validación de la contraseña
    function validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    }

    // Función para mostrar un mensaje con SweetAlert2
    function showMessage(message, isSuccess) {
        Toast.fire({
            icon: isSuccess ? "success" : "error",
            title: message
        });
    }

    // Función para obtener y rellenar los datos del usuario
    const loadUserData = () => {
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
    };

    // Llama a loadUserData cuando la página carga
    loadUserData();

    // Mostrar mensaje almacenado en localStorage tras la recarga
    if (localStorage.getItem('toastMessage')) {
        const messageData = JSON.parse(localStorage.getItem('toastMessage'));
        Toast.fire({
            icon: messageData.icon,
            title: messageData.title
        });
        localStorage.removeItem('toastMessage');
    }

    // Guardar cambios del formulario
    document.querySelector('#profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario

        // Captura de los valores de los campos de contraseña
        const currentPassword = document.querySelector('input[name="current_password"]').value;
        const newPassword = document.querySelector('input[name="new_password"]').value;
        const confirmPassword = document.querySelector('input[name="confirm_new_password"]').value;

        // Validar solo si alguno de los campos de contraseña está lleno
        if (currentPassword || newPassword || confirmPassword) {
            // Verificar que todos los campos de contraseña están completos
            if (!currentPassword || !newPassword || !confirmPassword) {
                showMessage('Complete all fields to change your password.', false);
                return;
            }

            // Verificar que la nueva contraseña no sea igual a la actual
            if (currentPassword === newPassword) {
                showMessage('The new password cannot be the same as the current password.', false);
                return;
            }

            // Validar la estructura de la nueva contraseña
            if (!validatePassword(newPassword)) {
                showMessage('The password must be at least 8 characters and contain uppercase and lowercase letters, numbers, and special characters.', false);
                return;
            }

            // Verificar que la nueva contraseña y la confirmación coincidan
            if (newPassword !== confirmPassword) {
                showMessage('Passwords do not match.', false);
                return;
            }
        }

        // Obtener los datos del formulario
        const formData = new FormData(this);

        // Enviar los datos al backend para actualizar el perfil
        fetch('/pcgateway/php/update_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                localStorage.setItem('toastMessage', JSON.stringify({ icon: "error", title: data.error }));
            } else {
                localStorage.setItem('toastMessage', JSON.stringify({ icon: "success", title: data.success }));

                // Mostrar mensaje adicional si hubo un cambio de contraseña
                if (data.password_change) {
                    localStorage.setItem('toastMessage', JSON.stringify({ icon: "info", title: data.password_change }));
                }
            }
            // Recargar la página después de guardar el mensaje en localStorage
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            localStorage.setItem('toastMessage', JSON.stringify({ icon: "error", title: 'An error occurred. Please try again.' }));
            window.location.reload();
        });
    });
});