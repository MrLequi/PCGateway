<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link rel="stylesheet" href="assets/css/components/header.css">
        <link rel="stylesheet" href="assets/css/pages/contact.css">
        <link rel="stylesheet" href="assets/css/components/footer.css">
        <link rel="stylesheet" href="assets/css/typography.css">
        <link rel="stylesheet" href="assets/css/layout.css">
        <link rel="icon" href="assets/images/icons/logotipo-icon.ico">
        <title>Contact</title>
    </head>
    <body>
        <?php include 'includes/header.php';?>

        <main>
            <div class="container">
                <section class="form_cont">
                    <form action="">
                        <h2 class="ibm-plex-sans-medium">Get in touch!</h2>
                        <p class="ibm-plex-sans-light">Subscribe to our newsletters and learn about the special offers</p>
                        <input type="text" class="user-name" placeholder="Your name">
                        <input type="text" class="user-phone" placeholder="Your phone">
                        <input type="text" class="user-message" placeholder="Your message">
                        <button class="ibm-plex-sans-regular">SEND MESSAGE</button>
                    </form>
                </section>
                <section class="contact_cont">
                    <div>
                        <h2 class="ibm-plex-sans-medium">Contact Information</h2>
                        <h3 class="ibm-plex-sans-medium">Adress</h3>
                        <p class="ibm-plex-sans-light">Paralela Sur, 15800 Ciudad de la Costa, Departamento de Canelones</p>
                        <h3 class="ibm-plex-sans-medium">Phones</h3>
                        <p class="ibm-plex-sans-light">Mobile: 098.921.935</p>
                        <h3 class="ibm-plex-sans-medium">Mail</h3>
                        <p class="ibm-plex-sans-light">info.pcgateway@mail.com</p>
                    </div>
                </section>
            </div>
            
            <div class="image_adress">
                <a href=""><img src="" alt=""></a>
            </div>

            <form action="" class="suscribe_form">
                <h2 class="ibm-plex-sans-medium">Subscribe to our newsletter!</h2>
                <input type="text" placeholder="Your email">
                <button>SUSCRIBE</button>
            </form>
        </main>

        <?php include 'includes/footer.php';?>
    </body>
</html>