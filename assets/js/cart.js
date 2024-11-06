document.addEventListener('DOMContentLoaded', function () {
    const cartTable = document.querySelector('table');
    const cartTotal = document.querySelector('.total p:nth-child(2)');
    const mainContent = document.querySelector('main');
    const cartMain = document.getElementById('cart-main'); // Referencia al main oculto

    // Función para cargar los productos del carrito
    function loadCart() {
        fetch('/pcgateway/php/cart_backend.php?action=loadCart')
            .then(response => response.json())
            .then(data => {
                cartTable.innerHTML = `
                    <tr class="header_table">
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>AMOUNT</th>
                        <th>SUBTOTAL</th>
                    </tr>
                `;

                if (data.empty) {
                    mainContent.innerHTML = `
                        <div class="empty-cart">
                            <i class='bx bx-cart-alt' style="font-size: 5rem; color: #777;"></i>
                            <p class="ibm-plex-sans-medium" style="font-size: 1.2rem; color: #777;">No products added to the cart</p>
                            <button class="return-to-shop poppins-bold">
                                RETURN TO SHOP
                            </button>
                        </div>
                    `;

                    document.querySelector('.return-to-shop').addEventListener('click', function () {
                        window.location.href = '/pcgateway/pages/catalog.php';
                    });

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
                                    <button class="less" data-product-id="${item.id_producto}" data-cart-id="${item.id_carrito}">
                                        <i class='bx bx-minus'></i>
                                    </button>
                                    <div class="amount"><p id="productQuantity" class="poppins-bold">${item.cantidad}</p></div>
                                    <button class="plus" data-product-id="${item.id_producto}" data-cart-id="${item.id_carrito}">
                                        <i class='bx bx-plus'></i>
                                    </button>
                                </td>
                                <td class="subtotal ibm-plex-sans-bold">US$ ${subtotal.toFixed(2)}</td>
                            </tr>
                        `;

                        cartTable.insertAdjacentHTML('beforeend', row);
                        total += subtotal;
                    });

                    cartTotal.textContent = `US$ ${total.toFixed(2)}`;
                    cartMain.style.display = 'block';

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
        fetch('/pcgateway/php/cart_backend.php?action=removeProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadCart(); // Recargar el carrito principal
                updateCartInfo(); // Actualizar la información del carrito en el header
            } else {
                console.error('Error removing product:', data.message);
            }
        })
        .catch(error => console.error('Error removing product:', error));
    }    

    // Función para actualizar la cantidad de un producto en el carrito
    function updateAmount(productId, cartId, newQuantity) {
        fetch('/pcgateway/php/cart_backend.php?action=updateQuantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                cart_id: cartId,
                new_quantity: newQuantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadCart();
            } else {
                console.error('Error updating product quantity:', data.message);
            }
        })
        .catch(error => console.error('Error updating product quantity:', error));
    }

    // Manejar eventos de clic en los botones de cantidad
    document.addEventListener('click', function (e) {
        if (e.target.closest('.plus')) {
            const productId = e.target.closest('.plus').dataset.productId;
            const cartId = e.target.closest('.plus').dataset.cartId;
            const currentQuantity = parseInt(e.target.closest('.amount').querySelector('.poppins-bold').textContent, 10);
            updateAmount(productId, cartId, currentQuantity + 1);
        }
        if (e.target.closest('.less')) {
            const productId = e.target.closest('.less').dataset.productId;
            const cartId = e.target.closest('.less').dataset.cartId;
            const currentQuantity = parseInt(e.target.closest('.amount').querySelector('.poppins-bold').textContent, 10);
            if (currentQuantity > 1) {
                updateAmount(productId, cartId, currentQuantity - 1);
            }
        }
    });

    function updateCartInfo() {
        fetch('/pcgateway/php/cart_backend.php?action=loadCart')
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

    // Cargar el carrito al inicio
    loadCart();
});