<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/product.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
</head>

<body>
    <?php include '../includes/header.php';?>

    <main>
        <div class="product">
            <img id="productImage" src="" alt="Product Image">

            <div>
                <section class="product_info">
                    <p id="productName" class="product_name ibm-plex-sans-bold"></p>
                    <p id="productPrice" class="product_price ibm-plex-sans-semibold"></p>
                    <p class="details ibm-plex-sans-semibold">Disponibilidad: 
                        <span id="productStock" class="ibm-plex-sans-regular"></span>
                    </p>
                    <p class="details ibm-plex-sans-semibold">Categoría: 
                        <span id="productCategory" class="ibm-plex-sans-regular"></span>
                    </p>
                </section>
                <section class="add_to_cart">
                    <button class="less"><i class='bx bx-minus'></i></button>
                    <div class="amount"><p id="productQuantity" class="poppins-bold">1</p></div>
                    <button class="plus"><i class='bx bx-plus'></i></button>
                    <button class="add_to_cart_button"><i class='bx bx-cart'></i><p class="poppins-bold">AÑADIR AL CARRITO</p></button>
                </section>
                <section class="wish_list">
                    <i class='bx bx-heart'></i><p class="poppins-bold">AÑADIR A LA LISTA DE DESEADOS</p>
                </section>
            </div>
        </div>
        <section class="description">
            <div class="title poppins-bold">
                <p>DESCRIPCIÓN</p>
            </div>
            <div id="productDescription" class="text ibm-plex-sans-regular"></div>
        </section>
    </main>

    <?php include '../includes/footer.php';?>

    <script src="/pcgateway/assets/js/product.js"></script>
</body>

</html>