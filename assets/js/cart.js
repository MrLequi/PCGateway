document.addEventListener('DOMContentLoaded', function () {
    const cartTable = document.querySelector('table');
    const cartTotal = document.querySelector('.total p:nth-child(2)');
    const mainContent = document.querySelector('main');
    const cartMain = document.getElementById('cart-main'); // Referencia al main oculto

    // Función para cargar los productos del carrito
    function loadCart() {
        fetch('/pcgateway/php/cart_backend.php')
            .then(response => response.json())
            .then(data => {
                // Limpiar la tabla para evitar productos repetidos
                cartTable.innerHTML = `
                    <tr class="header_table">
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>AMOUNT</th>
                        <th>SUBTOTAL</th>
                    </tr>
                `;

                if (data.empty) {
                    // Si el carrito está vacío, mostrar el ícono, mensaje y botón
                    mainContent.innerHTML = `
                        <div class="empty-cart">
                            <i class='bx bx-cart-alt' style="font-size: 5rem; color: #777;"></i>
                            <p class="ibm-plex-sans-medium" style="font-size: 1.2rem; color: #777;">No products added to the cart</p>
                            <button class="return-to-shop poppins-bold">
                                RETURN TO SHOP
                            </button>
                        </div>
                    `;

                    // Agregar evento de click para redirigir al catálogo
                    document.querySelector('.return-to-shop').addEventListener('click', function () {
                        window.location.href = '/pcgateway/pages/catalog.php';
                    });

                    // Esconder el total del carrito
                    cartTotal.textContent = 'US$ 0.00';
                    cartMain.style.display = 'block';
                } else {
                    let total = 0;

                    data.items.forEach(item => {
                        const precio = parseFloat(item.precio);
                        const subtotal = parseFloat(item.subtotal);

                        const row = `
                            <tr class="details_table">
                                <td class="product ibm-plex-sans-medium">
                                    <div class="product-image-container">
                                        <img src="${item.imagen}" alt="${item.nombre}">
                                        <button class="remove-product" data-product-id="${item.id_producto}">
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                    ${item.nombre}
                                </td>
                                <td class="price ibm-plex-sans-medium">US$ ${precio.toFixed(2)}</td>
                                <td class="amount">
                                    <button class="less"><i class='bx bx-minus'></i></button>
                                    <div class="amount"><p id="productQuantity" class="poppins-bold">${item.cantidad}</p></div>
                                    <button onclick="updateAmount(${item.id_producto}, ${item.id_carrito}, ${item.cantidad+1})" class="plus"><i class='bx bx-plus'></i></button>
                                </td>
                                <td class="subtotal ibm-plex-sans-bold">US$ ${subtotal.toFixed(2)}</td>
                            </tr>
                        `;

                        cartTable.insertAdjacentHTML('beforeend', row);
                        total += subtotal;
                    });

                    cartTotal.textContent = `US$ ${total.toFixed(2)}`;
                    cartMain.style.display = 'block'; // Mostrar el contenido del carrito

                    // Añadir evento de click para eliminar productos
                    document.querySelectorAll('.remove-product').forEach(button => {
                        button.addEventListener('click', function () {
                            const productId = this.getAttribute('data-product-id');
                            removeProductFromCart(productId);
                        });
                    });
                }
            })
            .catch(error => console.error('Error fetching cart:', error));
    }

    // Función para eliminar productos del carrito
    function removeProductFromCart(productId) {
        fetch('/pcgateway/php/cart_backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Recargar el carrito después de la eliminación
                loadCart();
            } else {
                console.error('Error removing product:', data.message);
            }
        })
        .catch(error => console.error('Error removing product:', error));
    }

    function updateAmount() {
        
    }

    // Cargar el carrito inicialmente
    loadCart();
});