<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/categoria-producto.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
</head>

<body>
    <?php include '../includes/header.php';?>

    <main>
        <div class="categorie-product">
            <section class="categories">
                <h3 class="ibm-plex-sans-medium">Product Categories</h3>
                <ul id="categories-list">
                    <!-- Aquí se llenarán las categorías desde el archivo JavaScript -->
                </ul>
            </section>

            <section class="products-container">
                <div class="select-field">
                    <p class="ibm-plex-sans-regular">Sort By:</p>
                    <select name="" id=""></select>
                </div>

                <div class="products">
                    <!-- Aquí se llenarán los productos desde el archivo JavaScript -->

                    <div class="pagination">
                    <!-- Aquí se llenará la paginación desde el archivo JavaScript -->
                    </div>
                </div>
            </section>
        </div>
    </main>

    <?php include '../includes/footer.php';?>

    <script src="../assets/js/categoria-producto.js"></script>
</body>

</html>