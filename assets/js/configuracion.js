document.addEventListener("DOMContentLoaded", function () {
    fetchConfiguration();
    fetchBanners();
});

function fetchConfiguration() {
    fetch('../php/configuracion.php?action=getConfig')
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre_empresa').value = data.nombre_empresa;
            document.getElementById('telefono').value = data.telefono;
            document.getElementById('email').value = data.email;
            document.getElementById('direccion').value = data.direccion;
        })
        .catch(error => console.error('Error:', error));
}

function fetchBanners() {
    fetch('../php/configuracion.php?action=getBanners')
        .then(response => response.json())
        .then(data => {
            const bannersDiv = document.getElementById('banners');
            bannersDiv.innerHTML = '';
            data.forEach(banner => {
                const bannerDiv = document.createElement('div');
                bannerDiv.innerHTML = `
                    <img src="${banner.url}" alt="Banner" style="width: 200px;">
                    <button onclick="deleteBanner(${banner.id})">Eliminar</button>
                `;
                bannersDiv.appendChild(bannerDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addBanner() {
    const bannerUrl = document.getElementById('banner_url').value;
    if (bannerUrl) {
        fetch('../php/configuracion.php?action=addBanner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: bannerUrl }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchBanners(); // Refresh banners list
            } else {
                console.error('Error adding banner:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingresa una URL válida.');
    }
}

function deleteBanner(id) {
    fetch('../php/configuracion.php?action=deleteBanner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchBanners(); // Refresh banners list
        } else {
            console.error('Error deleting banner:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('configForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        nombre_empresa: formData.get('nombre_empresa'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion'),
    };
    fetch('../php/configuracion.php?action=updateConfig', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Configuración guardada exitosamente.');
        } else {
            console.error('Error saving configuration:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});
