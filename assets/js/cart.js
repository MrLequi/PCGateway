document.addEventListener('DOMContentLoaded', function () {
    fetch('/pcgateway/php/cart_backend.php')
        .then(response => response.json())
        .then(data => {
            const cartTable = document.querySelector('table');
            const cartTotal = document.querySelector('.total p:nth-child(2)');

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
                cartTable.insertAdjacentHTML('beforeend', `<tr><td colspan="4">${data.message}</td></tr>`);
                cartTotal.textContent = 'US$ 0.00';
            } else {
                let total = 0;

                data.items.forEach(item => {
                    // Asegurarse de que `precio` sea un número
                    const precio = parseFloat(item.precio);
                    const subtotal = parseFloat(item.subtotal);

                    const row = `
                        <tr class="details_table">
                            <td class="product ibm-plex-sans-medium">
                                <img src="${item.imagen}" alt="${item.nombre}">
                                ${item.nombre}
                            </td>
                            <td class="price ibm-plex-sans-medium">US$ ${precio.toFixed(2)}</td>
                            <td class="amount">
                                <button class="less"><i class='bx bx-minus'></i></button>
                                <div class="amount"><p id="productQuantity" class="poppins-bold">${item.cantidad}</p></div>
                                <button class="plus"><i class='bx bx-plus'></i></button>
                            </td>
                            <td class="subtotal ibm-plex-sans-bold">US$ ${subtotal.toFixed(2)}</td>
                        </tr>
                    `;

                    cartTable.insertAdjacentHTML('beforeend', row);
                    total += subtotal;
                });

                cartTotal.textContent = `US$ ${total.toFixed(2)}`;
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
});