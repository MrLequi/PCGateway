<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/shipments.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <title>Shipments | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php';?>

    <main>
        <section class="shipments">
            <h1 class="poppins-bold">Shipments</h1>
            
            <h2 class="poppins-bold">Montevideo</h2>
            <ul>
                <li class="ibm-plex-sans-regular">All shipments within Montevideo have a cost of US$5.</li>
                <li class="ibm-plex-sans-regular">Shipments within Montevideo are made from Monday to Saturday.</li>
                <li class="ibm-plex-sans-regular">Delivery times within Montevideo are: Monday to Friday from 3:00 p.m. to 9:00 p.m. and Saturdays from 1:00 p.m. to 7:00 p.m.</li>
                <li class="ibm-plex-sans-regular">All orders whose receipts have been sent before 11:00 will be processed.</li>
            </ul>
            
            <h2 class="poppins-bold">Interior</h2>
            <ul>
                <li class="ibm-plex-sans-regular">Domestic shipments have a cost of US$5 for dispatch management, the agency's shipping cost is not included.</li>
                <li class="ibm-plex-sans-regular">All internal deliveries are made from Monday to Friday at 5:00 p.m.</li>
                <li class="ibm-plex-sans-regular">All orders whose payments have been credited before 2:00 p.m. will be processed.</li>
            </ul>
        </section>
    </main>

    <?php include '../includes/footer.php';?>
</body>
</html>