// Verificación de acceso en admin-page.html
document.addEventListener("DOMContentLoaded", () => {
    fetch('/pcgateway/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            // Verifica si el usuario está logueado y tiene rol de Admin o Vendedor
            if (!data.loggedIn || (data.userRole !== 'Admin' && data.userRole !== 'Vendedor')) {
                window.location.href = '../pages/admin.html';
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
            window.location.href = '../pages/admin.html';
        });
});