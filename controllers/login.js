
const { buscarUsuario } = require("../models/loginModel");

const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("loginMessage");
const boton = document.getElementById("btnLogin");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuario = document.getElementById("username").value.trim();
    const contrasena = document.getElementById("password").value;

    mensaje.textContent = "";

    if (usuario === "" || contrasena === "") {
        mensaje.textContent = "Ingrese su usuario y contraseña.";
        return;
    }

    boton.disabled = true;
    boton.textContent = "Verificando...";

    buscarUsuario(usuario, function (error, datosUsuario) {
        boton.disabled = false;
        boton.textContent = "Iniciar sesión";

        if (error) {
            console.error(error);
            mensaje.textContent = "Error al conectar con la base de datos.";
            return;
        }

        if (!datosUsuario || datosUsuario.contrasena !== contrasena) {
            mensaje.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        mensaje.style.color = "#55bfdf";
        mensaje.textContent = "Inicio de sesión exitoso.";

        console.log("Usuario autenticado:", datosUsuario.usuario);
    });
});
