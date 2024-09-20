document.addEventListener('DOMContentLoaded', function () {
    console.log('header.js cargado'); // Verificar que el archivo se carga

    // Actualizar el estado del usuario
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de session_status:', data); // Verificar la respuesta

            if (data.loggedIn) {
                // Separar los enlaces de perfil y logout
                document.getElementById('user-info').innerHTML = `
                    <a href="/pcgateway/pages/perfil.php" id="profile-link">
                        <p class="ibm-plex-sans-regular">${data.userName}</p>
                    </a>
                    | 
                    <a href="#" id="logout-link">
                        <p class="ibm-plex-sans-regular">Logout</p>
                    </a>`;

                // Asignar el evento de logout
                document.getElementById('logout-link').addEventListener('click', logout);

            } else {
                document.getElementById('user-info').innerHTML = `
                    <a href="/pcgateway/pages/login.html">
                        <p class="ibm-plex-sans-regular">Login</p>
                    </a> 
                    | 
                    <a href="/pcgateway/pages/login.html">
                        <p class="ibm-plex-sans-regular">Register</p>
                    </a>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function logout() {
    fetch('/pcgateway/php/logout.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/pcgateway/index.php'; // Redirigir correctamente al index
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}