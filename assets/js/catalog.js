async function cargarProductosYCategorias(page = 1) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || '';
        const searchQuery = urlParams.get('search') || '';

        const newUrl = `${window.location.pathname}?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchQuery)}&page=${page}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        const response = await fetch(`/pcgateway/php/get_data.php?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchQuery)}&page=${page}`);
        if (!response.ok) {
            throw new Error('Error al cargar datos');
        }

        const data = await response.json();

        // Cargar categorías
        const categoriasList = document.querySelector('.categories ul');
        categoriasList.innerHTML = '';
        data.categories.forEach(categoria => {
            const li = document.createElement('li');
            li.className = 'ibm-plex-sans-bold';

            const p = document.createElement('p');
            p.textContent = categoria.nombre;
            p.onclick = () => {
                const categoryUrl = `${window.location.pathname}?category=${encodeURIComponent(categoria.nombre)}&page=1`;
                window.location.href = categoryUrl;
            };

            li.appendChild(p);
            categoriasList.appendChild(li);
        });

        // Cargar productos
        const productosContainer = document.querySelector('.products');
        productosContainer.innerHTML = '';
        data.products.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'item';
            productoDiv.innerHTML = `
                <a href="/pcgateway/pages/product.php?name=${encodeURIComponent(producto.nombre)}">
                    <div class="image_container">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <p class="product-name ibm-plex-sans-medium">${producto.nombre}</p>
                </a>
                <p class="product-price ibm-plex-sans-semibold">US$${producto.precio}</p>
            `;
            productosContainer.appendChild(productoDiv);
        });

        // Manejo de la paginación
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';

        // Flecha izquierda (previa)
        if (page > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = `<i class='bx bx-chevron-left'></i>`;
            prevButton.className = 'pagination-button';
            prevButton.onclick = () => cargarProductosYCategorias(page - 1);
            paginationContainer.appendChild(prevButton);
        }

        // Números de página
        for (let i = 1; i <= data.totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = 'pagination-button' + (i === page ? ' active' : '');
            pageButton.onclick = () => cargarProductosYCategorias(i);
            paginationContainer.appendChild(pageButton);
        }

        // Flecha derecha (siguiente)
        if (page < data.totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerHTML = `<i class='bx bx-chevron-right'></i>`;
            nextButton.className = 'pagination-button';
            nextButton.onclick = () => cargarProductosYCategorias(page + 1);
            paginationContainer.appendChild(nextButton);
        }

        productosContainer.appendChild(paginationContainer);

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page'), 10) || 1;
    cargarProductosYCategorias(page);
});