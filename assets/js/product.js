document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    let quantity = 1;

    const messageBox = document.getElementById('messageBox');

    function showMessage(message, isSuccess) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    }

    if (productName) {
        fetch(`/pcgateway/php/product.php?name=${encodeURIComponent(productName)}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.product) {
                    document.getElementById('productName').textContent = data.product.nombre;
                    document.getElementById('productPrice').textContent = `US$${data.product.precio}`;
                    document.getElementById('productStock').textContent = `${data.product.stock} disponible(s)`;
                    document.getElementById('productCategory').textContent = data.product.categoria;
                    document.getElementById('productImage').src = data.product.imagen;
                    document.getElementById('productImage').alt = data.product.nombre;
                    document.getElementById('productDescription').textContent = data.product.descripcion;
                    document.title = `${data.product.nombre} | PCGateway`;
                } else {
                    window.location.href = "/pcgateway/pages/404.html";
                }
            })
            .catch(error => {
                console.error('Error fetching the product:', error);
                window.location.href = "/pcgateway/pages/404.html";
            });
    }

    // Actualizar la cantidad
    const quantityElement = document.getElementById('productQuantity');
    document.querySelector('.plus').addEventListener('click', function() {
        quantity++;
        quantityElement.textContent = quantity;
    });

    document.querySelector('.less').addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    });

    // Enviar el producto al carrito
    document.querySelector('.add_to_cart_button').addEventListener('click', function() {
        fetch('/pcgateway/php/add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: productName,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Producto añadido al carrito', true); // Mensaje de éxito

                // Llamar a la función para actualizar el header del carrito
                updateCartInfo(); // Llamar la función que actualiza el carrito
            } else if (data.message === 'Usuario no autenticado') {
                window.location.href = "/pcgateway/pages/login.html"; // Redirigir a la página de login
            } else {
                showMessage(`Error al añadir el producto al carrito: ${data.message}`, false); // Mensaje de error
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            showMessage('Ocurrió un error al añadir el producto al carrito', false); // Mensaje de error genérico
        });
    });

    // Función para actualizar la información del carrito en el header
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
});