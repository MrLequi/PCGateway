document.addEventListener("DOMContentLoaded", function () {
    fetchCategorias();
    setupForm();
});

function fetchCategorias() {
    fetch('/pcgateway/php/product-management.php?action=getCategorias')
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
    fetch(`/pcgateway/php/product-management.php?action=getProductos&categoriaId=${categoriaId}`)
        .then(response => response.json())
        .then(data => {
            const productosDiv = document.getElementById('productos');
            productosDiv.innerHTML = '';

            if (data.length > 0) {
                const table = document.createElement('table');
                table.innerHTML = `
                    <tr>
                        <th>Imagen</th>
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
                        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;"></td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td>${producto.categoria}</td>
                        <td>
                            <button onclick="editProducto(${producto.id_producto})">Editar</button>
                            <button onclick="deleteProducto(${producto.id_producto})">Eliminar</button>
                        </td>
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

function editProducto(id) {
    fetch(`/pcgateway/php/product-management.php?action=getProductoById&id_producto=${id}`)
        .then(response => response.json())
        .then(producto => {
            // Rellenar el formulario con los datos del producto
            document.getElementById('id_producto').value = producto.id_producto;
            document.getElementById('imagen_url').value = producto.imagen;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('categoria').value = producto.categoria;
        })
        .catch(error => console.error('Error:', error));
}

function setupForm() {
    document.getElementById('productoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const id_producto = formData.get('id_producto');
        const data = {
            id_producto: id_producto ? id_producto : null,
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),
            precio: formData.get('precio'),
            stock: formData.get('stock'),
            categoria: formData.get('categoria'),
            imagen_url: formData.get('imagen_url')
        };

        const action = id_producto ? 'updateProduct' : 'addProduct';
        fetch(`/pcgateway/php/product-management.php?action=${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto guardado exitosamente.');
                fetchProductos(data.categoria);
            } else {
                console.error('Error:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

function deleteProducto(id) {
    fetch('/pcgateway/php/product-management.php?action=deleteProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto eliminado exitosamente.');
            fetchProductos(document.getElementById('categoria').value);
        } else {
            console.error('Error deleting product:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}