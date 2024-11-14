<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/wishlist.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/dist/sweetalert2.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.4/dist/sweetalert2.all.min.js"></script>
    <title>Wishlist | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php';?>

    <main>
        <div class="wishlist">
            <h2 class="poppins-bold">Wishlist</h2>
            <div id="wishlistItems" class="wishlist_items">
                <!-- Productos de la wishlist se cargarán aquí dinámicamente -->
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php';?>
    <script src="/pcgateway/assets/js/wishlist.js"></script>
</body>
</html>