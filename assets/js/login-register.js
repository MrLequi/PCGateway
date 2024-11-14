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

function showMessage(message, isSuccess) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: isSuccess ? "success" : "error",
        title: message
      });
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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

function loginVerify() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    let datos = new FormData();
    datos.append('email', email);
    datos.append('pass', pass);

    fetch('/pcgateway/php/login_usuario.php', { method: 'POST', body: datos })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/pcgateway/index.php';
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos',
                    icon: 'error'
                });
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
    const passRepeat = document.getElementById('register-pass-repeat').value;

    // Validaciones de campo
    if (!validateName(nombre)) {
        showMessage('Invalid name. Only letters and spaces are allowed.', false);
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Invalid email.', false);
        return;
    }

    if (!validatePassword(pass)) {
        showMessage('The password must be at least 8 characters and contain uppercase and lowercase letters, numbers and some special characters.', false);
        return;
    }

    if (pass !== passRepeat) {
        showMessage('Passwords do not match.', false);
        return;
    }

    let datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('pass', pass);

    fetch('/pcgateway/php/register_usuario.php', { method: 'POST', body: datos })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'Tu cuenta ha sido creada con éxito.',
                    icon: 'success'
                });
                iniciarSesion();  // Cambia la vista para el login
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.error || 'Error en el registro',
                    icon: 'error'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error en el registro. Por favor, inténtalo nuevamente.',
                icon: 'error'
            });
        });
}