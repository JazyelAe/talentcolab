// ===============================
// MENÚ RESPONSIVO
// ===============================

function mostrarMenu() {
    const menu = document.querySelector(".navbar");

    menu.classList.toggle("active");
}


// ===============================
// BOTONES DE TALENTCOLAB
// ===============================

function mostrarMensaje() {
    alert(
        "¡Bienvenido a TalentColab!\n\n" +
        "Aquí podrás conectar tus habilidades " +
        "con nuevas oportunidades profesionales."
    );
}


// ===============================
// CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
// ===============================

const enlaces = document.querySelectorAll(".navbar a");

enlaces.forEach(function(enlace) {

    enlace.addEventListener("click", function() {

        const menu = document.querySelector(".navbar");

        menu.classList.remove("active");

    });

});


// ===============================
// REGISTRO DEL SERVICE WORKER
// ===============================

// Verifica si el navegador es compatible con Service Workers.

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("./serviceworker.js")

            .then(function() {

                console.log(
                    "Service Worker registrado correctamente."
                );

            })

            .catch(function(error) {

                console.error(
                    "Error al registrar el Service Worker:",
                    error
                );

            });

    });

}
