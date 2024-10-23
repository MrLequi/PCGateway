document.getElementById("btn__registrarse").addEventListener("click", register);
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
window.addEventListener("resize", anchoPage);

var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

function validateName(name) {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function loginVerify() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    console.log("Datos del usuario: ", email, pass);

    let datos = new FormData();
    datos.append('email', email);
    datos.append('pass', pass);

    fetch('/pcgateway/php/login_usuario.php', { method: 'POST', body: datos })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/pcgateway/index.php';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function registerUser() {
    const nombre = document.getElementById('register-nombre').value;
    const email = document.getElementById('register-email').value;
    const pass = document.getElementById('register-pass').value;

    // Validaciones de campo
    if (!validateName(nombre)) {
        alert('Nombre inválido. Solo se permiten letras y espacios.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Correo electrónico inválido.');
        return;
    }

    if (!validatePassword(pass)) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    let datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('pass', pass);

    // Mostrar mensaje de procesamiento
    alert('Procesando registro. Esto puede tardar unos momentos...');

    // Enviar la solicitud de registro
    fetch('/pcgateway/php/register_usuario.php', { method: 'POST', body: datos })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso. Se ha enviado un correo de confirmación.');
                iniciarSesion();  // Cambia la vista para el login
            } else {
                // Mostrar mensaje de error si el correo ya está registrado o hay otro problema
                alert(data.error || 'Error en el registro');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error en el registro. Por favor, inténtalo nuevamente.');
        });
}