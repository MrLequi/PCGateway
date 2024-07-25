document.addEventListener('DOMContentLoaded', function () {
    console.log('header.js cargado'); // Verificar que el archivo se carga

    fetch('php/session_status.php')
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de session_status:', data); // Verificar la respuesta

            if (data.loggedIn) {
                document.getElementById('user-info').innerHTML = `<a href="#" id="logout-link"><p class="ibm-plex-sans-regular">${data.userName} | Logout</p></a>`;
                document.getElementById('logout-link').addEventListener('click', logout);
            } else {
                document.getElementById('user-info').innerHTML = `<a href="pages/login.html"><p class="ibm-plex-sans-regular">Login</p></a> | <a href="pages/login.html"><p class="ibm-plex-sans-regular">Register</p></a>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function logout() {
    fetch('php/logout.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'index.php';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}