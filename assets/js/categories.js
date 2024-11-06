document.addEventListener('DOMContentLoaded', () => {
    fetchCategoriesMenu();
});

function fetchCategoriesMenu() {
    fetch('/pcgateway/php/get_categories.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('categories-container');
            if (data.categories) {
                container.innerHTML = data.categories.map(cat => 
                    `<a class="ibm-plex-sans-regular" href="/pcgateway/pages/catalog.php?category=${encodeURIComponent(cat.nombre)}">
                        <p class="name-categories">${cat.nombre}</p>
                    </a>`
                ).join('');
            } else {
                container.innerHTML = '<p class="ibm-plex-sans-regular">No categories found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

function fetchCategoriesResponsiveMenu() {
    fetch('/pcgateway/php/get_categories.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('categories-res-container');
            if (data.categories) {
                container.innerHTML = data.categories.map(cat => 
                    `<a class="ibm-plex-sans-regular" href="/pcgateway/pages/catalog.php?category=${encodeURIComponent(cat.nombre)}">
                        <p class="name-categories">${cat.nombre}</p>
                    </a>`
                ).join('');
            } else {
                container.innerHTML = '<p class="ibm-plex-sans-regular">No categories found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}