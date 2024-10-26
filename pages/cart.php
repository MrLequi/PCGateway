<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/cart.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <title>Cart | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php'; ?>

    <main id="cart-main" style="display: none;"> <!-- Añadido id y ocultar con display:none -->
        <div class="ruta">
            <h2 class="ibm-plex-sans-bold" style="color: #fc6625;">Cart</h2>
            <i class='bx bx-chevron-right'></i>
            <h2 class="ibm-plex-sans-bold">Checkout</h2>
            <i class='bx bx-chevron-right'></i>
            <h2 class="ibm-plex-sans-bold" style="color: #777; cursor: default;">Finish purchase</h2>
        </div>
        <section class="cart">
            <table>
                <tr class="header_table">
                    <th class="poppins-bold">PRODUCT</th>
                    <th class="poppins-bold">PRICE</th>
                    <th class="poppins-bold">AMOUNT</th>
                    <th class="poppins-bold">SUBTOTAL</th>
                </tr>
                <!-- Aquí se agregarán dinámicamente los productos con JavaScript -->
            </table>
            <div>
                <h3 class="poppins-bold">CART TOTALS</h3>
                <div class="total">
                    <p class="ibm-plex-sans-bold">Total</p>
                    <p class="ibm-plex-sans-bold">US$0.00</p> <!-- Este valor se actualizará con JS -->
                </div>
                <button><p class="poppins-bold">FINISH PURCHASE</p><i class='bx bx-right-arrow-alt' style="font-size: 1.5rem;"></i></button>
            </div>
        </section>
    </main>

    <?php include '../includes/footer.php'; ?>

    <script src="../assets/js/cart.js"></script>
</body>
</html>