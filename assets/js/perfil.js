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

    // Función para obtener y rellenar los datos del usuario
    const loadUserData = () => {
        fetch('/pcgateway/php/session_status.php')
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos de session_status.php:", data);
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
            if (data.error) {
                console.error(data.error);
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            } else {
                Toast.fire({
                    icon: "success",
                    title: data.success
                });

                // Recargar los datos del usuario después de una actualización exitosa
                loadUserData();

                // Mostrar mensaje adicional si hubo un cambio de contraseña
                if (data.password_change) {
                    Toast.fire({
                        icon: "info",
                        title: data.password_change
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toast.fire({
                icon: "error",
                title: 'An error occurred. Please try again.'
            });
        });
    });
});