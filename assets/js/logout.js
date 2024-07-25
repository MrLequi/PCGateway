document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logout-link");
    
    if (logoutLink) {
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que el enlace redirija

            fetch('logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'logout' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload(); // Recarga la página actual
                } else {
                    console.error('Error al cerrar sesión');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});