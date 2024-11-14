// orders.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('/pcgateway/php/get_orders.php')
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById('ordersTableBody');
            const noOrdersMessage = document.querySelector('.no_orders');
            
            if (data.error) {
                noOrdersMessage.textContent = "Failed to load orders.";
                noOrdersMessage.style.display = "block";
                return;
            }

            if (data.length === 0) {
                noOrdersMessage.style.display = "block";
            } else {
                data.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.id_pedido}</td>
                        <td>$${order.total}</td>
                        <td>${order.fecha}</td>
                        <td>${order.productos}</td>
                        <td>${order.estado}</td>
                    `;
                    ordersTableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
});