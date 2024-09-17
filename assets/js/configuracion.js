document.addEventListener("DOMContentLoaded", function () {
    fetchConfiguration();
    fetchBanners();
});

function fetchConfiguration() {
    fetch('/pcgateway/php/configuracion.php?action=getConfig')
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
    fetch('/pcgateway/php/configuracion.php?action=getBanners')
        .then(response => response.json())
        .then(data => {
            const bannersDiv = document.getElementById('banners');
            bannersDiv.innerHTML = '';
            data.forEach(banner => {
                const bannerDiv = document.createElement('div');
                bannerDiv.innerHTML = `
                    <img src="data:image/jpeg;base64,${banner.imagen}" alt="Banner" style="width: 200px;">
                    <button onclick="deleteBanner(${banner.id})">Eliminar</button>
                `;
                bannersDiv.appendChild(bannerDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addBanner() {
    const fileInput = document.getElementById('banner_image');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64Image = reader.result.split(',')[1];
            fetch('/pcgateway/php/configuracion.php?action=addBanner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagen: base64Image }),
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
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecciona una imagen.');
    }
}

function deleteBanner(id) {
    fetch('/pcgateway/php/configuracion.php?action=deleteBanner', {
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
    fetch('/pcgateway/php/configuracion.php?action=updateConfig', {
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