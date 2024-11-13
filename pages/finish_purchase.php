<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/finish_purchase.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <title>Order Confirmation | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php'; ?>
    <main>
        <section class="order-summary">
            <h2>Order Confirmation</h2>
            <p>Thank you for your purchase! Here is your order summary:</p>
            <div id="orderTicket">
                <!-- Aquí se mostrará el ticket de compra mediante JavaScript -->
            </div>
        </section>
    </main>
    <?php include '../includes/footer.php'; ?>
    <script src="../assets/js/finish-purchase.js"></script>
</body>
</html>