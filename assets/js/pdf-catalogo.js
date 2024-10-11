document.addEventListener('DOMContentLoaded', function () {
    const categoryList = document.getElementById('categoryList');
    const catalogForm = document.getElementById('catalogForm');
    const messageDiv = document.getElementById('message');

    // Obtener las categorías del servidor
    fetch('/pcgateway/php/get_categories.php')
        .then(response => response.json())
        .then(data => {
            if (data.categories) {
                data.categories.forEach(category => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `category_${category.id_categoría}`;
                    checkbox.name = 'categories[]';
                    checkbox.value = category.id_categoría;
                    checkbox.className = 'category';

                    const label = document.createElement('label');
                    label.htmlFor = `category_${category.id_categoría}`;
                    label.innerText = category.nombre;

                    const container = document.createElement('div');
                    container.appendChild(checkbox);
                    container.appendChild(label);
                    categoryList.appendChild(container);
                });
            } else if (data.error) {
                messageDiv.innerText = 'Error al cargar categorías: ' + data.error;
            }
        })
        .catch(error => {
            messageDiv.innerText = 'Error de red: ' + error.message;
        });

    // Manejar el envío del formulario
    catalogForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const selectedCategories = Array.from(document.querySelectorAll('input[name="categories[]"]:checked'))
            .map(checkbox => checkbox.value);
        
        if (selectedCategories.length === 0) {
            messageDiv.innerText = 'Por favor selecciona al menos una categoría.';
            return;
        }

        // Generar el PDF en el servidor
        fetch('/pcgateway/php/generate_pdf.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categories: selectedCategories })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.innerHTML = `PDF generado exitosamente. <a href="${data.pdf_url}" download>Descargar PDF</a>`;
            } else {
                messageDiv.innerText = 'Error al generar PDF: ' + data.error;
            }
        })
        .catch(error => {
            messageDiv.innerText = 'Error de red: ' + error.message;
        });
    });
});