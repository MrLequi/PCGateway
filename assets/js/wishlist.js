document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario está autenticado y obtener su wishlist
    fetch('/pcgateway/php/get_wishlist.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.items.length > 0) {
                const wishlistItems = document.getElementById('wishlistItems');
                data.items.forEach(item => {
                    // Crear el contenedor del producto en la wishlist
                    const productContainer = document.createElement('div');
                    productContainer.classList.add('wishlist_item');
                    productContainer.innerHTML = `
                        <a href="/pcgateway/pages/product.php?name=${encodeURIComponent(item.nombre)}">
                            <img src="${item.imagen}" alt="${item.nombre}" class="wishlist_image">
                        </a>
                        <div class="wishlist_info">
                            <a href="/pcgateway/pages/product.php?name=${encodeURIComponent(item.nombre)}" class="wishlist_name ibm-plex-sans-bold">
                                ${item.nombre}
                            </a>
                            <p class="wishlist_price ibm-plex-sans-semibold">US$${item.precio}</p>
                            <button class="remove_wishlist_button" data-id="${item.id_producto}"><i class='bx bx-trash'></i> Remove</button>
                        </div>
                    `;
                    wishlistItems.appendChild(productContainer);
                });

                // Configurar evento para eliminar producto de la wishlist
                document.querySelectorAll('.remove_wishlist_button').forEach(button => {
                    button.addEventListener('click', function () {
                        const productId = this.getAttribute('data-id');
                        fetch('/pcgateway/php/remove_from_wishlist.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ product_id: productId })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire('Removed', 'Product removed from wishlist', 'success');
                                this.parentElement.parentElement.remove(); // Remove the product element from the DOM
                            } else {
                                Swal.fire('Error', 'Could not remove product', 'error');
                            }
                        });
                    });
                });
            } else {
                document.getElementById('wishlistItems').innerHTML = '<p class="ibm-plex-sans-regular">Your wishlist is empty.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading wishlist:', error);
            document.getElementById('wishlistItems').innerHTML = '<p class="ibm-plex-sans-regular">Failed to load wishlist.</p>';
        });
});