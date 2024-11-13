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
                    <img src="${banner.imagen}" alt="Banner" style="width: 200px;">
                    <button onclick="confirmDeleteBanner(${banner.id})">Remove</button>
                `;
                bannersDiv.appendChild(bannerDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function confirmDeleteBanner(id) {
    Swal.fire({
        title: "Do you want to remove this banner?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, remove",
        denyButtonText: `No, keep it`
    }).then((result) => {
        if (result.isConfirmed) {
            deleteBanner(id);
        } else if (result.isDenied) {
            Swal.fire("The banner was not removed", "", "info");
        }
    });
}

function deleteBanner(id) {
    fetch('/pcgateway/php/configuracion.php?action=deleteBanner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchBanners();
            Swal.fire('Removed!', 'The banner has been removed.', 'success');
        } else {
            console.error('Error deleting banner:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addBanner() {
    const bannerUrl = document.getElementById('banner_url').value;
    if (bannerUrl) {
        Swal.fire({
            title: "Do you want to add this banner?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't add`
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('/pcgateway/php/configuracion.php?action=addBanner', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imagen: bannerUrl })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        fetchBanners();
                        Swal.fire('Added!', 'The banner has been added.', 'success');
                    } else {
                        console.error('Error al agregar el banner:', data.error);
                    }
                })
                .catch(error => console.error('Error:', error));
            } else if (result.isDenied) {
                Swal.fire("The banner was not added", "", "info");
            }
        });
    } else {
        alert('Por favor, ingresa una URL de imagen.');
    }
}

document.getElementById('configForm').addEventListener('submit', function (event) {
    event.preventDefault();
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
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
                    Swal.fire('Saved!', 'The configuration has been saved.', 'success');
                } else {
                    console.error('Error saving configuration:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});