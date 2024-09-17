document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    fetch('/pcgateway/php/get_cart_products.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
    })
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <p>${product.nombre}</p>
                <p>US$${product.precio}</p>
                <p>Quantity: ${cart[product.id_producto]}</p>
            `;
            cartItemsContainer.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});