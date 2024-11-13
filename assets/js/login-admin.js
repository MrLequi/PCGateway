// Función para manejar el inicio de sesión de administrador
function adminLogin() {
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-pass').value;

    let datos = new FormData();
    datos.append('email', email);
    datos.append('pass', pass);

    fetch('/pcgateway/php/login_admin.php', { method: 'POST', body: datos })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/pcgateway/pages/admin-page.html';
            } else {
                alert('Acceso denegado. Verifique sus credenciales o rol.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}