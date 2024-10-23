document.addEventListener('DOMContentLoaded', function () {

    // Obtener estado de sesión (usuario)
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
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

                // Llamar a la función para obtener el carrito si el usuario está autenticado
                updateCartInfo();

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

    // Función para cerrar sesión
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

    // Obtener los datos del carrito y actualizarlos en el header
    function updateCartInfo() {
        fetch('/pcgateway/php/cart_backend.php')
            .then(response => response.json())
            .then(data => {
                if (data.empty) {
                    document.querySelector('.user_area .ibm-plex-sans-regular').textContent = 'Shopping Cart (0)';
                    document.querySelector('.user_area .price').textContent = '$0.00';
                } else {
                    let totalItems = 0;
                    let totalPrice = 0.00;

                    data.items.forEach(item => {
                        totalItems += item.cantidad;
                        totalPrice += parseFloat(item.subtotal);
                    });

                    document.querySelector('.user_area .ibm-plex-sans-regular').textContent = `Shopping Cart (${totalItems})`;
                    document.querySelector('.user_area .price').textContent = `$${totalPrice.toFixed(2)}`;
                }
            })
            .catch(error => {
                console.error('Error al obtener el carrito:', error);
            });
    }

    // Mostrar/Ocultar menú hamburguesa
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menuContent = document.getElementById('hamburger-menu-content');
    
    hamburgerMenu.addEventListener('click', function () {
        menuContent.classList.toggle('active');
    });
});