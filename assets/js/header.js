document.addEventListener('DOMContentLoaded', function () {
    console.log('header.js cargado'); // Verificar que el archivo se carga

    fetch('php/session_status.php')
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de session_status:', data); // Verificar la respuesta

            if (data.loggedIn) {
                document.getElementById('user-info').innerHTML = `<a href="#" id="logout-link"><p class="ibm-plex-sans-regular">${data.userName} | Logout</p></a>`;
                document.getElementById('logout-link').addEventListener('click', logout);

                const navPages = document.querySelector('.nav_pages');
                let links = '<a href="index.php"><p class="ibm-plex-sans-regular">Home</p></a>';
                links += '<a href="contact.php"><p class="ibm-plex-sans-regular">Contact</p></a>';

                if (data.userRole === 'Admin') {
                    links += '<a href="pages/configuracion.html"><i class="bx bx-cog"></i></a>';
                    links += '<a href="pages/productos.html"><i class="bx bxs-package"></i></a>';
                } else if (data.userRole === 'Vendedor') {
                    links += '<a href="pages/productos.html"><i class="bx bxs-package"></i></a>';
                }

                navPages.innerHTML = links;

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