<header class="header_include">
    <div class="cont_sup">
        <div class="header_direccion">
            <i class='bx bx-map icon'></i><p class="ibm-plex-sans-regular">El Pinar, Canelones, Uruguay</p>
        </div>
        <div class="cont_sec">
            <i class='bx bx-map-alt icon'></i><a href="https://maps.app.goo.gl/hDpk1NXLmYH9Bu23A"><p class="ibm-plex-sans-regular">Adresses shops</p></a>
            <i id="user-icon" class='bx bx-user-circle icon'></i>
            <span id="user-info"></span>
        </div>
    </div>

    <section class="header_sec">
        <i class='bx bx-menu'></i>
        <div class="cont_logotipo">
            <div class="cont_nameshop">
                <a href="/pcgateway/"><h2 class="raleway-black">PCGateway</h2></a>
            </div>
            <div class="cont_img">
                <a href="#"><img class="logotipo_img" src="/pcgateway/assets/images/logotipo-icon.png" alt=""></a>
            </div>
        </div>
        <div class="search_bar">
            <form method="GET" action="/pcgateway/pages/catalog.php">
                <input class="poppins-light" type="text" name="search" placeholder="Your searched...">
                <button type="submit"><i class='bx bx-search'></i></button>
            </form>
        </div>
        <div class="user_area">
            <a href="/pcgateway/pages/perfil.php"><i id="user-icon" class='bx bx-user-circle'></i></a>
            <a href="/pcgateway/pages/wishlist.php"><i class='bx bx-heart'></i></a>
            <a href="/pcgateway/pages/cart.php"><i class='bx bx-cart'></i></a>
            <div>
                <p class="ibm-plex-sans-regular">Shopping Cart <span class="poppins-semibold">(0)</span></p>
                <p class="poppins-semibold price">$0.00</p>
            </div>
        </div>
    </section>
    <!-- Menú lateral deslizable -->
    <div class="side-menu" id="side-menu">
        <div class="search_bar_res">
            <form method="GET" action="/pcgateway/pages/catalog.php">
                <input class="poppins-light" type="text" name="search" placeholder="Your searched...">
                <button type="submit"><i class='bx bx-search'></i></button>
            </form>
        </div>
        <div id="categories-res-container"></div> <!-- Se llenará con JavaScript -->
    </div>
    <section class="nav_bar">
        <div class="nav_categories">
            <i class='bx bx-menu'></i>
            <p class="poppins-semibold">CATEGORIES</p>
            <div class="menu-content" id="categories-container"></div>
        </div>
    </section>
</header>
<script src="/pcgateway/assets/js/header.js"></script>
<script src="/pcgateway/assets/js/cart.js"></script>
<script src="/pcgateway/assets/js/categories.js"></script>