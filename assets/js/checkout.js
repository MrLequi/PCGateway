document.addEventListener('DOMContentLoaded', function() {
    generarSeccionOrden();
    cargarProductosCarrito();
    cargarDatosDeSesion();

    const purchaseButton = document.querySelector('.purchase_button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            if (verifyRequiredFields()) {
                finalizeOrder();
            } else {
                alert("Please fill in all required fields marked with *.");
            }
        });
    }

    // Obtener elementos para los botones
    const paymentButton = document.querySelector('.order .payment button');
    const paymentPopup = document.getElementById('paymentPopup');
    const closePopupButton = document.getElementById('closePopup');

    // Verificar que los botones existan antes de agregar el evento
    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            paymentPopup.style.display = 'flex';
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', function() {
            paymentPopup.style.display = 'none';
        });

        paymentPopup.addEventListener('click', function(event) {
            if (event.target === paymentPopup) {
                paymentPopup.style.display = 'none';
            }
        });
    }
});

function verifyRequiredFields() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    return Array.from(requiredFields).every(field => field.value.trim() !== "");
}

function finalizeOrder() {
    fetch('/pcgateway/php/cart_backend.php?action=loadCart')
        .then(response => response.json())
        .then(data => {
            if (data.error || data.empty) {
                console.error('Error:', data.error || 'El carrito está vacío');
                return;
            }

            const total = data.items.reduce((acc, item) => acc + (parseFloat(item.subtotal) || 0), 0);
            const productos = data.items.map(item => ({
                id: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                subtotal: parseFloat(item.subtotal).toFixed(2)
            }));

            fetch('/pcgateway/php/finalize_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total: total,
                    productos: productos
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    updateCartInfo();
                    window.location.href = '/pcgateway/pages/finish_purchase.php';
                } else {
                    console.error('Error finalizing order:', result.message);
                }
            })
            .catch(error => console.error('Error al finalizar el pedido:', error));
        })
        .catch(error => console.error('Error al cargar productos del carrito:', error));
}

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

function generarSeccionOrden() {
    const orderSection = document.querySelector('.order');

    // Título de la sección de orden
    const title = document.createElement('h2');
    title.className = 'poppins-bold';
    title.textContent = 'YOUR ORDER';
    orderSection.appendChild(title);

    // Cabecera de productos
    const productHeader = document.createElement('div');
    productHeader.className = 'separator';
    const productHeaderText = document.createElement('p');
    productHeaderText.className = 'poppins-medium';
    productHeaderText.textContent = 'PRODUCT';
    productHeader.appendChild(productHeaderText);
    orderSection.appendChild(productHeader);

    // Contenedor de productos
    const productosDiv = document.createElement('div');
    productosDiv.className = 'productos';
    orderSection.appendChild(productosDiv);

    // Sección de métodos de pago
    const paymentDiv = document.createElement('div');
    paymentDiv.className = 'payment';
    const paymentText = document.createElement('p');
    paymentText.className = 'ibm-plex-sans-medium';
    paymentText.textContent = 'Payment methods';
    const paymentButton = document.createElement('button');
    paymentButton.className = 'poppins-bold payment_button';
    paymentButton.textContent = 'SELECT PAYMENT METHOD';
    paymentDiv.appendChild(paymentText);
    paymentDiv.appendChild(paymentButton);
    orderSection.appendChild(paymentDiv);

    // Sección para finalizar la compra
    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'purchase';
    const purchaseButton = document.createElement('button');
    purchaseButton.className = 'poppins-bold purchase_button';
    purchaseButton.textContent = 'FINALIZE ORDER';
    purchaseDiv.appendChild(purchaseButton);
    orderSection.appendChild(purchaseDiv);
}

function cargarProductosCarrito() {
    fetch('/pcgateway/php/cart_backend.php?action=loadCart')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            
            const productosDiv = document.querySelector('.productos');

            if (data.empty) {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'ibm-plex-sans-medium';
                emptyMessage.textContent = data.message || 'El carrito está vacío';
                productosDiv.appendChild(emptyMessage);
            } else {
                data.items.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('separator');
                    
                    const nombreProducto = document.createElement('p');
                    nombreProducto.className = 'ibm-plex-sans-medium product_name';
                    nombreProducto.textContent = `${producto.nombre} × ${producto.cantidad}`;

                    const precioProducto = document.createElement('p');
                    precioProducto.className = 'ibm-plex-sans-medium';
                    precioProducto.style.color = '#555';
                    const subtotal = parseFloat(producto.subtotal) || 0;
                    precioProducto.textContent = `US$${subtotal.toFixed(2)}`;

                    productoDiv.appendChild(nombreProducto);
                    productoDiv.appendChild(precioProducto);
                    productosDiv.appendChild(productoDiv);
                });

                // Calcular y mostrar el total
                const total = data.items.reduce((acc, item) => acc + (parseFloat(item.subtotal) || 0), 0);
                const totalDiv = document.createElement('div');
                totalDiv.classList.add('separator');
                const totalText = document.createElement('p');
                totalText.className = 'ibm-plex-sans-medium';
                totalText.textContent = 'Total';
                const totalPrice = document.createElement('p');
                totalPrice.className = 'ibm-plex-sans-bold';
                totalPrice.style.fontSize = '1.118rem';
                totalPrice.textContent = `US$${total.toFixed(2)}`;

                totalDiv.appendChild(totalText);
                totalDiv.appendChild(totalPrice);

                productosDiv.appendChild(totalDiv);
            }
        })
        .catch(error => console.error('Error al cargar los productos del carrito:', error));
}

// Función para cargar datos de la sesión
function cargarDatosDeSesion() {
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                document.getElementById('name').value = data.userName || '';
                document.getElementById('surname').value = data.userApellidos || '';
                document.getElementById('email').value = data.userEmail || '';
            }
        })
        .catch(error => console.error('Error al cargar datos de sesión:', error));
}

// Función para guardar la tarjeta en LocalStorage
function guardarTarjetaEnLocalStorage() {
    const numeroTarjeta = document.getElementById('cardNumber').value;
    const fechaExpiracion = document.getElementById('expirationDate').value;
    const codigoSeguridad = document.getElementById('securityCode').value;

    // Validar que los campos no estén vacíos
    if (numeroTarjeta && fechaExpiracion && codigoSeguridad) {
        const tarjeta = {
            numero: numeroTarjeta,
            expiracion: fechaExpiracion,
            codigo: codigoSeguridad
        };

        // Guardar en LocalStorage
        localStorage.setItem('tarjeta', JSON.stringify(tarjeta));
        alert('Tarjeta guardada correctamente');
    } else {
        alert('Por favor, completa todos los campos de la tarjeta.');
    }
}

// Agregar el evento al botón de "Submit Payment" (ejemplo)
document.addEventListener('DOMContentLoaded', function() {
    const submitPaymentButton = document.getElementById('submitPayment');
    if (submitPaymentButton) {
        submitPaymentButton.addEventListener('click', guardarTarjetaEnLocalStorage);
    }
});

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosDeSesion);

// Obtener elementos
const paymentButton = document.querySelector('.order .payment button');
const paymentPopup = document.getElementById('paymentPopup');
const closePopupButton = document.getElementById('closePopup');

// Mostrar el popup al hacer clic en "SELECT PAYMENT METHOD"
paymentButton.addEventListener('click', function() {
    paymentPopup.style.display = 'flex';
});

// Ocultar el popup al hacer clic en "Cancel" o fuera del popup
closePopupButton.addEventListener('click', function() {
    paymentPopup.style.display = 'none';
});

paymentPopup.addEventListener('click', function(event) {
    if (event.target === paymentPopup) {
        paymentPopup.style.display = 'none';
    }
});