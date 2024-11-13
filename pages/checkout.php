<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/checkout.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <title>Checkout | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php'; ?>
        
    <main>
        <div class="ruta">
            <h2 class="ibm-plex-sans-bold" style="color: #777;">Cart</h2>
            <i class='bx bx-chevron-right'></i>
            <h2 class="ibm-plex-sans-bold"><a style="color: #fc6625;;" href="/pcgateway/pages/checkout.php">Checkout</a></h2>
            <i class='bx bx-chevron-right'></i>
            <h2 class="ibm-plex-sans-bold" style="color: #777; cursor: default;">Finish purchase</h2>
        </div>
        <div class="checkout">
            <section class="billing_details">
                <h2 class="ibm-plex-sans-bold">Billing details</h2>
                <form action="">
                    <div>
                        <div>
                            <label class="ibm-plex-sans-medium" for="name">Name <span class="required_field">*</span></label>
                            <input type="text" id="name" name="name">
                        </div>
                        <div>
                            <label class="ibm-plex-sans-medium" for="surname">Surname <span class="required_field">*</span></label>
                            <input type="text" id="surname" name="surname">
                        </div>
                    </div>
                    <label class="ibm-plex-sans-medium" for="">ID document <span class="required_field">*</span></label>
                    <input type="text">
                    <label class="ibm-plex-sans-medium" class="ibm-plex-sans-medium" for="">Street adress <span class="required_field">*</span></label>
                    <input type="text">
                    <label class="ibm-plex-sans-medium" for="">City <span class="required_field">*</span></label>
                    <input type="text">
                    <label class="ibm-plex-sans-medium" for="">Departament <span class="required_field">*</span></label>
                    <select name="" id="">
                        <option value="Canelones">Canelones</option>
                        <option value="Montevideo">Montevideo</option>
                    </select>
                    <label class="ibm-plex-sans-medium" for="">Phone <span class="required_field">*</span></label>
                    <input type="text">
                    <label class="ibm-plex-sans-medium" for="email">Email address <span class="required_field">*</span></label>
                    <input type="text" id="email" name="email">
                </form>
            </section>
            <section class="order">
                <!-- El contenido se generará dinámicamente desde JavaScript -->
            </section>
        </div>
        <!-- Payment Method Popup -->
        <div id="paymentPopup" class="popup-overlay">
            <div class="popup-content">
                <h2 class="ibm-plex-sans-semibold">Enter Card Details</h2>
                <form id="paymentForm">
                    <label class="ibm-plex-sans-regular" for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" name="cardNumber">

                    <label class="ibm-plex-sans-regular" for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName">

                    <label class="ibm-plex-sans-regular" for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName">

                    <label class="ibm-plex-sans-regular" for="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY">

                    <label class="ibm-plex-sans-regular" for="securityCode">Security Code</label>
                    <input type="password" id="securityCode" name="securityCode">

                    <button class="ibm-plex-sans-medium" type="submit">Submit Payment</button>
                    <button class="ibm-plex-sans-medium" type="button" id="closePopup">Cancel</button>
                </form>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <script src="../assets/js/checkout.js"></script>
</body>
</html>