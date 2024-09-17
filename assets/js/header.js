document.addEventListener('DOMContentLoaded', function () {
    console.log('header.js cargado'); // Verificar que el archivo se carga

    // Actualizar el estado del usuario
    fetch('/pcgateway/php/session_status.php')
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
                    links += '<a href="/pcgateway/pages/configuracion.html"><i class="bx bx-cog"></i></a>';
                    links += '<a href="/pcgateway/pages/productos.html"><i class="bx bxs-package"></i></a>';
                } else if (data.userRole === 'Vendedor') {
                    links += '<a href="/pcgateway/pages/productos.html"><i class="bx bxs-package"></i></a>';
                }

                navPages.innerHTML = links;

            } else {
                document.getElementById('user-info').innerHTML = `<a href="/pcgateway/pages/login.html"><p class="ibm-plex-sans-regular">Login</p></a> | <a href="/pcgateway/pages/login.html"><p class="ibm-plex-sans-regular">Register</p></a>`;
            }

            // Actualizar el carrito
            actualizarCarrito();
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
                window.location.href = 'index.php';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function actualizarCarrito() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalItems = 0;
    let totalPrice = 0;

    for (const productId in cart) {
        if (cart.hasOwnProperty(productId)) {
            // Aquí deberías reemplazar con una llamada a la API que devuelva el precio del producto
            const producto = getProductoById(productId); // Función ficticia para obtener datos del producto
            if (producto) {
                totalItems += cart[productId];
                totalPrice += producto.precio * cart[productId];
            }
        }
    }

    document.querySelector('.user_area p:first-of-type').textContent = `Shopping Cart (${totalItems})`;
    document.querySelector('.user_area .price').textContent = `$${totalPrice.toFixed(2)}`;
}

function getProductoById(productId) {
    // Función ficticia para obtener datos del producto. Deberías implementar una API o método para obtener el precio.
    const productos = {
        '1': { precio: 10.00 },
        '2': { precio: 15.50 }
    };
    return productos[productId];
}