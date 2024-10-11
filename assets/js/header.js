document.addEventListener('DOMContentLoaded', function () {

    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de session_status:', data);

            if (data.loggedIn) {
                document.getElementById('user-info').innerHTML = `
                    <a href="/pcgateway/pages/perfil.php" id="profile-link">
                        <p class="ibm-plex-sans-regular">${data.userName}</p>
                    </a>
                    | 
                    <a href="#" id="logout-link">
                        <p class="ibm-plex-sans-regular">Logout</p>
                    </a>`;

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
                window.location.href = '/pcgateway/index.php';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {

    const menuButton = document.querySelector('.res_menu');
    const menuContent = document.querySelector('.menu-content');

    menuButton.addEventListener('click', () => {
        menuContent.classList.toggle('active');
    });
});