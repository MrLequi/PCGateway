document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    let quantity = 1;

    const quantityElement = document.getElementById('productQuantity');

    // Función para mostrar mensajes usando SweetAlert
    function showMessage(message, isSuccess) {
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
          Toast.fire({
            icon: isSuccess ? "success" : "error",
            title: message
          });
    }

    // Cargar datos del producto
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

    // Añadir producto al carrito
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
                showMessage('Producto añadido al carrito', true);
                updateCartInfo();
            } else if (data.message === 'Usuario no autenticado') {
                window.location.href = "/pcgateway/pages/login.html";
            } else {
                showMessage(`Error al añadir el producto al carrito: ${data.message}`, false);
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            showMessage('Ocurrió un error al añadir el producto al carrito', false);
        });
    });

    // Actualizar información del carrito en el header
    function updateCartInfo() {
        fetch('/pcgateway/php/cart_backend.php?action=loadCart')
            .then(response => response.json())
            .then(data => {
                if (data.empty) {
                    document.querySelector('.user_area .ibm-plex-sans-regular').textContent = 'Shopping Cart (0)';
                    document.querySelector('.user_area .price').textContent = '$0.00';
                } else if (data.items && Array.isArray(data.items)) {
                    let totalItems = 0;
                    let totalPrice = 0.00;
                    data.items.forEach(item => {
                        totalItems += item.cantidad;
                        totalPrice += parseFloat(item.subtotal);
                    });
                    document.querySelector('.user_area .ibm-plex-sans-regular').textContent = `Shopping Cart (${totalItems})`;
                    document.querySelector('.user_area .price').textContent = `$${totalPrice.toFixed(2)}`;
                } else {
                    document.querySelector('.user_area .ibm-plex-sans-regular').textContent = 'Shopping Cart (0)';
                    document.querySelector('.user_area .price').textContent = '$0.00';
                }
            })
            .catch(error => {
                console.error('Error al obtener el carrito:', error);
                document.querySelector('.user_area .ibm-plex-sans-regular').textContent = 'Shopping Cart (0)';
                document.querySelector('.user_area .price').textContent = '$0.00';
            });
    }
});