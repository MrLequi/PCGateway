function verificarUsuario(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let datos = new FormData();
    datos.append('email', email);
    datos.append('password', password);

    fetch(`login_usuario.php`, {method: 'POST', body: datos})
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            alert('Usuario y contraseña correctos');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const linkCrearCuenta = document.getElementById("link-crear-cuenta");
    const linkIngresar = document.getElementById("link-ingresar");
    const formularioLogin = document.querySelector(".formulario-login");
    const btnLogin = document.getElementById("btn-login");
    const formularioRegistrar = document.querySelector(".formulario-registrar");
    const btnRegistrar = document.getElementById("btn-registrar");

    linkCrearCuenta.addEventListener("click", function(e) {
        e.preventDefault();
        formularioLogin.classList.add("fade-out");
        btnLogin.classList.add("fade-out");
        formularioRegistrar.classList.remove("fade-in");
        btnRegistrar.classList.remove("fade-in");

        setTimeout(() => {
            formularioLogin.style.display = "none";
            btnLogin.style.display = "none";
            formularioLogin.classList.remove("fade-out");
            btnLogin.classList.remove("fade-out");

            formularioRegistrar.style.display = "block";
            btnRegistrar.style.display = "block";
            formularioRegistrar.classList.add("fade-in");
            btnRegistrar.classList.add("fade-in");
        }, 500);
    });

    linkIngresar.addEventListener("click", function(e) {
        e.preventDefault();
        formularioRegistrar.classList.add("fade-out");
        btnRegistrar.classList.add("fade-out");
        formularioLogin.classList.remove("fade-in");
        btnLogin.classList.remove("fade-in");

        setTimeout(() => {
            formularioRegistrar.style.display = "none";
            btnRegistrar.style.display = "none";
            formularioRegistrar.classList.remove("fade-out");
            btnRegistrar.classList.remove("fade-out");

            formularioLogin.style.display = "block";
            btnLogin.style.display = "block";
            formularioLogin.classList.add("fade-in");
            btnLogin.classList.add("fade-in");
        }, 500);
    });
});