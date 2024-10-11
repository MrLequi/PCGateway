document.addEventListener("DOMContentLoaded", function() {
    const bannerContainer = document.querySelector(".add_banner");
    let banners = [];
    let currentIndex = 0;

    async function loadBanners() {
        try {
            const response = await fetch('/pcgateway/php/get_banners.php');
            banners = await response.json();
            displayBanner(currentIndex);
        } catch (error) {
            console.error("Error al cargar los banners:", error);
        }
    }

    function displayBanner(index) {
        if (banners.length === 0) return;
        currentIndex = (index + banners.length) % banners.length;

        const img = document.createElement('img');
        img.src = banners[currentIndex].imagen;
        img.alt = "Banner";
        img.classList.add('fade');

        bannerContainer.innerHTML = '';
        bannerContainer.appendChild(img);
        addNavigationArrows();
        
        setTimeout(() => {
            img.classList.add('visible');
        }, 50);
    }

    function addNavigationArrows() {
        const rowLeft = document.createElement('div');
        rowLeft.classList.add('row-left');
        rowLeft.innerHTML = "<i class='bx bx-chevron-left'></i>";
        rowLeft.addEventListener('click', () => {
            displayBanner(currentIndex - 1);
        });

        const rowRight = document.createElement('div');
        rowRight.classList.add('row-right');
        rowRight.innerHTML = "<i class='bx bx-chevron-right'></i>";
        rowRight.addEventListener('click', () => {
            displayBanner(currentIndex + 1);
        });

        bannerContainer.appendChild(rowLeft);
        bannerContainer.appendChild(rowRight);
    }

    loadBanners();
});