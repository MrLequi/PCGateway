<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/pcgateway/assets/css/components/header.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/pages/perfil.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/components/footer.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/typography.css">
    <link rel="stylesheet" href="/pcgateway/assets/css/layout.css">
    <link rel="icon" href="/pcgateway/assets/images/icons/logotipo-icon.ico">
    <title>Account Details | PCGateway</title>
</head>
<body>
    <?php include '../includes/header.php';?>

    <main>
        <section class="account">
            <div class="my_account">
                <h5 class="poppins-bold">MY ACCOUNT</h5>
                <ul>
                    <li class="ibm-plex-sans-medium"><a href="">Orders</a></li>
                    <li class="ibm-plex-sans-bold"><a href=""><span class="bold">Account details</span></a></li>
                    <li class="ibm-plex-sans-medium"><a href="">Wishlist</a></li>
                </ul>
            </div>
            <div class="manage">
                <h5 class="poppins-bold">PCGATEWAY MANAGE</h5>
                <ul>
                    <li class="settings ibm-plex-sans-medium"><a href="configuracion.html">Settings</a></li>
                    <li class="products ibm-plex-sans-medium"><a href="product-management.html">Products</a></li>
                    <li class="catalog ibm-plex-sans-medium"><a href="pdf_catalogo.html">Catalog</a></li>
                    <li class="user_manage ibm-plex-sans-medium"><a href="user_manage.html">User manage</a></li>
                </ul>
            </div>
        </section>
        <section class="details">
            <div class="icon_text">
                <i class='bx bx-user'></i>
                <div class="account_details_div">
                    <h3 class="ibm-plex-sans-bold">Account details</h3>
                </div>
                <div class="dark_light_toggle">
                    <i class='bx bx-sun'></i>
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round" id="switchCheckbox"></span>
                    </label>
                    <i class='bx bx-moon' ></i>
                </div>
            </div>
            <div class="account">
            
                <form id="profileForm" method="POST">
                    <div class="name_surname">
                        <div>
                            <label class="ibm-plex-sans-medium">Name <span class="stared">*</span></label>
                            <input class="name poppins-medium" type="text" name="nombre" required>
                        </div>
                        <div>
                            <label class="ibm-plex-sans-medium">Surnames <span class="stared">*</span></label>
                            <input class="surname poppins-medium" type="text" name="apellidos" required>
                        </div>
                    </div>
                    <div class="display_name">
                        <label class="ibm-plex-sans-medium">Display name <span class="stared">*</span></label>
                        <input class="poppins-medium" type="text" name="display_name" required>
                        <p class="ibm-plex-sans-medium">This will be how your name will be displayed in your account section</p>
                    </div>
                    <div class="email">
                        <label class="ibm-plex-sans-medium">Email <span class="stared">*</span></label>
                        <input class="poppins-medium" type="email" name="email" required>
                    </div>
                    <section class="change_pass">
                        <div>
                            <h3 class="poppins-bold">PASSWORD CHANGE</h3>
                            <label class="ibm-plex-sans-medium">Current password (leave blank to keep unchanged)</label>
                            <input type="password" name="current_password">
                            <label class="ibm-plex-sans-medium">New password (leave blank to keep unchanged)</label>
                            <input type="password" name="new_password">
                            <label class="ibm-plex-sans-medium">Confirm new password</label>
                            <input type="password" name="confirm_new_password">
                        </div>
                    </section>

                    <!-- Botón de Guardar cambios -->
                    <button class="poppins-bold" type="submit">SAVE CHANGES</button>

                    <!-- Div para mostrar mensajes de éxito o error -->
                    <div id="message" class="message" style="display: none;"></div>

                </form>
            </div>
            
        </section>
    </main>

    <?php include '../includes/footer.php';?>

    <script src="/PCGateway/assets/js/perfil.js"></script>
</body>
</html>