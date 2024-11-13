document.addEventListener("DOMContentLoaded", function () {
    fetchCategorias();
    setupForm();
});

function fetchCategorias() {
    fetch('/pcgateway/php/product-management.php?action=getCategorias')
        .then(response => response.json())
        .then(data => {
            const categoriaSelect = document.getElementById('categoria');
            categoriaSelect.innerHTML = ''; // Limpia opciones previas
            data.forEach(categoria => {
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.productos || !Array.isArray(data.productos)) {
                console.error('Error: Datos inesperados recibidos', data);
                return;
            }
            displayProducts(data.productos);
        })
        .catch(error => console.error('Error:', error));
}

function searchProduct() {
    const form = document.getElementById("productoForm");
    const params = new URLSearchParams(new FormData(form)).toString();
    
    fetch(`/pcgateway/php/product-management.php?action=searchProduct&${params}`)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.productos || !Array.isArray(data.productos)) {
                console.error('Error: Datos inesperados recibidos', data);
                return;
            }
            displayProducts(data.productos);
        })
        .catch(error => console.error('Error:', error));
}

function displayProducts(productos) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    
    if (productos.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
        `;
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button onclick="editProducto(${producto.id_producto})">Edit</button>
                    <button onclick="deleteProducto(${producto.id_producto})">Remove</button>
                </td>
            `;
            table.appendChild(row);
        });
        productosDiv.appendChild(table);
    } else {
        productosDiv.innerHTML = 'No products found.';
    }
}

function renderPagination(totalItems, categoriaId) {
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpia antes de agregar
    paginationContainer.appendChild(paginationDiv);

    const totalPages = Math.ceil(totalItems / limit);
    paginationDiv.innerHTML = '';

    // Botón de página anterior
    const prevButton = document.createElement('button');
    prevButton.innerHTML = "<i class='bx bx-chevron-left'></i>";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            fetchProductos(categoriaId, currentPage);
        }
    };
    paginationDiv.appendChild(prevButton);

    // Botones de números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.onclick = () => {
            currentPage = i;
            fetchProductos(categoriaId, i);
        };
        paginationDiv.appendChild(pageButton);
    }

    // Botón de página siguiente
    const nextButton = document.createElement('button');
    nextButton.innerHTML = "<i class='bx bx-chevron-right'></i>";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchProductos(categoriaId, currentPage);
        }
    };
    paginationDiv.appendChild(nextButton);

    const productosDiv = document.getElementById('productos');
    productosDiv.appendChild(paginationDiv);
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

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
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
                        Swal.fire("Saved!", "", "success");
                        fetchProductos(data.categoria);
                    } else {
                        console.error('Error:', data.error);
                    }
                })
                .catch(error => console.error('Error:', error));
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    });
}

function deleteProducto(id) {
    Swal.fire({
        title: "Are you sure you want to delete this product?",
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/pcgateway/php/product-management.php?action=deleteProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire("Deleted!", "The product has been deleted.", "success");
                    fetchProductos(document.getElementById('categoria').value);
                } else {
                    console.error('Error deleting product:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            Swal.fire("Product not deleted", "", "info");
        }
    });
}