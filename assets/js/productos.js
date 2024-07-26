document.addEventListener("DOMContentLoaded", function () {
    fetchCategorias();
    setupForm();
});

function fetchCategorias() {
    fetch('../php/productos.php?action=getCategorias')
        .then(response => response.json())
        .then(data => {
            const categoriasDiv = document.getElementById('categorias');
            const categoriaSelect = document.getElementById('categoria');
            categoriasDiv.innerHTML = '';
            categoriaSelect.innerHTML = '';
            data.forEach(categoria => {
                // Botones de categorías
                const button = document.createElement('button');
                button.textContent = categoria.nombre;
                button.onclick = () => fetchProductos(categoria.id_categoría);
                categoriasDiv.appendChild(button);

                // Opciones del select de categorías
                const option = document.createElement('option');
                option.value = categoria.id_categoría;
                option.textContent = categoria.nombre;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

function fetchProductos(categoriaId) {
    fetch(`../php/productos.php?action=getProductos&categoriaId=${categoriaId}`)
        .then(response => response.json())
        .then(data => {
            const productosDiv = document.getElementById('productos');
            productosDiv.innerHTML = '';

            if (data.length > 0) {
                const table = document.createElement('table');
                table.innerHTML = `
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                `;
                data.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td>${producto.categoria}</td>
                        <td><button onclick="deleteProducto(${producto.id_producto})">Eliminar</button></td>
                    `;
                    table.appendChild(row);
                });
                productosDiv.appendChild(table);
            } else {
                productosDiv.innerHTML = 'No hay productos en esta categoría.';
            }
        })
        .catch(error => console.error('Error:', error));
}

function setupForm() {
    document.getElementById('productoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio: formData.get('precio'),
            stock: formData.get('stock'),
            categoria: formData.get('categoria'),
        };

        fetch('../php/productos.php?action=addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto agregado exitosamente.');
                fetchProductos(data.categoria);
            } else {
                console.error('Error adding product:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

function deleteProducto(productId) {
    fetch('../php/productos.php?action=deleteProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto eliminado exitosamente.');
            fetchCategorias();
        } else {
            console.error('Error deleting product:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}