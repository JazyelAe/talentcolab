```javascript
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
```
