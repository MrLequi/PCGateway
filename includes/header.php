<header class="header_include">
    <div class="cont_sup">
        <div class="header_direccion">
            <i class='bx bx-map icon'></i><p class="ibm-plex-sans-regular">Pinar, Canelones, Uruguay</p>
        </div>
        <div class="cont_sec">
        <i class='bx bx-map-alt icon'><a href="#"></i><p class="ibm-plex-sans-regular">Adresses shops</p></a>
        <i class='bx bx-user-circle icon'></i><a href="#"><p class="ibm-plex-sans-regular">Login </p></a>|<a href="#"><p class="ibm-plex-sans-regular">Register</p></a>
        </div>
    </div>

    <section class="header_sec">
        <div class="cont_logotipo">
            <div class="cont_nameshop">
                <a href="#"><h2 class="ibm-plex-sans-bold">PCGateway</h2></a>
            </div>
            <div class="cont_img">
                <a href="#"><img class="logotipo_img" src="assets/images/logotipo-icon.png" alt=""></a>
            </div>
        </div>
        <div class="search_bar">
            <form method="POST" action="#">
                <div class="search_input">
                    <input type="text" name="user_search" placeholder="Your searched...">
                </div>
                <div class="search_icon">
                    <button><i class='bx bx-search'></i></button>
                </div>
            </form>
        </div>
        <div class="header_contact">
            <p class="ibm-plex-sans-regular">24/7</p>
            <p class="ibm-plex-sans-regular contact">800.123.456.78</p>
        </div>
        <div class="user_area">
            <a href="#"><i class='bx bx-heart'></i></a>
            <a href="#"><i class='bx bx-cart'></i></a>
            <div>
                <p class="ibm-plex-sans-regular">Shopping Cart</p>
                <p class="ibm-plex-sans-regular price">$0.00</p>
            </div>
        </div>
    </section>
    <section class="nav_bar">
        <div class="nav_categories">
            <i class='bx bx-menu-alt-left'></i>
            <p class="ibm-plex-sans-semibold">All categories</p>
            <div class="menu-content">
                <?php
                $dsn = "mysql:host=localhost;dbname=tiendadb;";
                $username = "root";
                $password = "";

                try {
                    $pdo = new PDO($dsn, $username, $password);
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    $stmt = $pdo->query("SELECT id, nombre FROM categorias");

                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        echo '<a href="#">' . htmlspecialchars($row['nombre']) . '</a>';
                    }
                } catch (PDOException $e) {
                    echo 'Error: ' . $e->getMessage();
                }
                ?>
            </div>
        </div>
        <div class="nav_pages">
            <a href="#"><p class="ibm-plex-sans-regular">Home</p></a>
            <a href="#"><p class="ibm-plex-sans-regular">Contact</p></a>
        </div>
    </section>
</header>