document.addEventListener('DOMContentLoaded', function() {
    fetchOrderDetails();
});

function fetchOrderDetails() {
    fetch('/pcgateway/php/finalize_order.php?action=getOrderSummary')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const orderTicket = document.getElementById('orderTicket');
                orderTicket.innerHTML = `
                    <p>Order ID: ${data.orderId}</p>
                    <p>Total: $${data.total}</p>
                    <ul>${data.productos.map(p => `<li>${p.nombre} × ${p.cantidad} - $${p.subtotal}</li>`).join('')}</ul>
                    <a href="/pcgateway/php/generate_order_pdf.php" download="ticket_de_compra.pdf">
                        <button>Download PDF</button>
                    </a>
                `;
            } else {
                console.error('Error loading order summary:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}