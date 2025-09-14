// Selecciona los elementos
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nextButton = document.getElementById("next-button");

// Variable para rastrear el estado del botón
let isEmailStage = true;

// Evento al hacer clic en el botón "Next" o "Iniciar sesión"
nextButton.addEventListener("click", function() {
    if (isEmailStage) {
        // El usuario está en la etapa de ingreso de email
        if (emailInput.value === "") {
            alert("Por favor, ingrese su email.");
        } else {
            // Muestra el campo de contraseña y cambia el botón a "Iniciar sesión"
            emailInput.style.display = "none";
            passwordInput.style.display = "block";
            nextButton.textContent = "Iniciar sesion"; // Cambia el texto del botón
            isEmailStage = false; // Cambia el estado a la etapa de contraseña
        }
    } else {
        // El usuario está en la etapa de ingreso de contraseña
        if (passwordInput.value === "") {
            alert("Por favor, ingrese su contraseña.");
        } else {
            // Redirige a la página de selección
            window.location.href = "seleccion.html"; // Cambia 'seleccion.html' por la URL de tu página
        }
    }
});
