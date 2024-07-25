document.addEventListener("DOMContentLoaded", function () {
    fetchConfiguration();
    fetchBanners();
    fetchProducts();
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

function fetchProducts() {
    fetch('../php/configuracion.php?action=getProducts')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <div>
                        <h3>${product.nombre}</h3>
                        <p>${product.descripcion}</p>
                        <p>Precio: ${product.precio}</p>
                        <p>Stock: ${product.stock}</p>
                        <p>Categoría: ${product.categoria}</p>
                        <button onclick="deleteProduct(${product.id})">Eliminar</button>
                    </div>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addProduct(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('productForm'));
    const data = {
        nombre: formData.get('product_name'),
        descripcion: formData.get('product_description'),
        precio: formData.get('product_price'),
        stock: formData.get('product_stock'),
        categoria: formData.get('product_category'),
    };
    fetch('../php/configuracion.php?action=addProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchProducts(); // Refresh products list
        } else {
            console.error('Error adding product:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    fetch('../php/configuracion.php?action=deleteProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchProducts(); // Refresh products list
        } else {
            console.error('Error deleting product:', data.error);
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

document.getElementById('productForm').addEventListener('submit', addProduct);