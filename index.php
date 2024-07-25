<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="assets/css/components/header.css">
    <link rel="stylesheet" href="assets/css/pages/home.css">
    <link rel="stylesheet" href="assets/css/components/footer.css">
    <link rel="stylesheet" href="assets/css/typography.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="icon" href="assets/images/icons/logotipo-icon.ico">
    <title>HOME</title>
</head>
<body>
    <?php include 'includes/header.php';?>

    <main>
        <div class="add_banner">
            <a href="#"><img src="assets/images/banner/GygabyteG5_BannerWeb-1.png" alt=""></a>
            <div class="row-left"><i class='bx bx-chevron-left' ></i></div>
            <div class="row-right"><i class='bx bx-chevron-right'></i></div>
        </div>

        <section class="hardware_categories">
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon1.png" alt="">
                    <p class="ibm-plex-sans-regular">Motherboard</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon2.png" alt="">
                    <p class="ibm-plex-sans-regular">CPU</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon3.png" alt="">
                    <p class="ibm-plex-sans-regular">HDD</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon4.png" alt="">
                    <p class="ibm-plex-sans-regular">RAM</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon8.png" alt="">
                    <p class="ibm-plex-sans-regular">Video card</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon6.png" alt="">
                    <p class="ibm-plex-sans-regular">Computer Case</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon7.png" alt="">
                    <p class="ibm-plex-sans-regular">Cooler</p>
                </a>
            </div>
            <div>
                <a href="#">
                    <img src="assets/images/icons/icon5.png" alt="">
                    <p class="ibm-plex-sans-regular">Power Supply</p>
                </a>
            </div>
        </section>

        <h2 class="poppins-bold">Destacados</h2>
        <section class="shop_catalog">
            <div>
                <a href="#">
                    <div class="image_container">
                        <img src="assets/images/items/item1.jpg" alt="">
                        <div><p class="ibm-plex-sans-regular">Ver detalle</p></div>
                    </div>
                    <div class="product_container">
                        <p class="product_name ibm-plex-sans-medium">Equipo AMD Ryzen 5 7600 Full Gamer - 16gb DDR5 - SSD - RTX4060</p>
                        <p class="product_price ibm-plex-sans-medium">US$1,300.00</p>
                    </div>
                </a>
            </div>
            <div>
                <a href="#">
                    <div class="image_container">
                        <img src="assets/images/items/item2.jpg" alt="">
                        <div><p class="ibm-plex-sans-regular">Ver detalle</p></div>
                    </div>
                    <div class="product_container">
                        <p class="product_name ibm-plex-sans-medium">Equipo Intel Core i7 14700Kf Full Gamer - 32gb - SSD PCIe - RTX4070</p>
                        <p class="product_price ibm-plex-sans-medium">US$2,625.00</p>
                    </div>
                </a>
            </div>
            <div>
                <a href="#">
                    <div class="image_container">
                        <img src="assets/images/items/item3.jpg" alt="">
                        <div><p class="ibm-plex-sans-regular">Ver detalle</p></div>
                    </div>
                    <div class="product_container">
                        <p class="product_name ibm-plex-sans-medium">Equipo Intel Core i5 10400f Pro Gamer 16gb - SSD - RTX3060 12gb</p>
                        <p class="product_price ibm-plex-sans-medium">US$950.00</p>
                    </div>
                </a>
            </div>
            <div>
                <a href="#">
                    <div class="image_container">
                        <img src="assets/images/items/item4.jpg" alt="">
                        <div><p class="ibm-plex-sans-regular">Ver detalle</p></div>
                    </div>
                    <div class="product_container">
                        <p class="product_name ibm-plex-sans-medium">Equipo Inte Core i5 10400f Pro Gamer 16gb - SSD - GTX1650</p>
                        <p class="product_price ibm-plex-sans-medium">US$675.00</p>
                    </div>
                </a>
            </div>
        </section>
    </main>

    <?php include 'includes/footer.php';?>
</body>
</html>