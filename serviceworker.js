/*
=========================================================
ARCHIVO: serviceworker.js
PROYECTO: TalentColab | Impulsa tu talento
=========================================================

¿QUÉ ES UN ARCHIVO JAVASCRIPT (.js)?

Un archivo JavaScript (.js) contiene instrucciones que permiten
agregar comportamiento e interactividad a una página web.

JavaScript puede utilizarse para:

- Manipular elementos HTML.
- Responder a eventos del usuario.
- Validar formularios.
- Consumir APIs.
- Modificar contenido dinámicamente.
- Administrar almacenamiento local.
- Implementar funcionalidades de una PWA.

---------------------------------------------------------

¿QUÉ ES UN SERVICE WORKER?

Un Service Worker es un archivo JavaScript que funciona en
segundo plano, separado de la página web principal.

Su función principal es permitir que una aplicación web tenga
características similares a una aplicación instalada.

Entre sus principales funciones se encuentran:

- Guardar archivos en caché.
- Permitir cierto funcionamiento sin conexión.
- Interceptar solicitudes de red.
- Administrar recursos almacenados en caché.
- Mejorar el rendimiento de una aplicación web.
- Servir como base para algunas funciones de una PWA.

El Service Worker no modifica directamente el contenido HTML
de la página ni puede acceder directamente al DOM.

---------------------------------------------------------

¿PARA QUÉ SIRVE serviceworker.js?

En este proyecto se utiliza para administrar una caché con los
archivos principales de TalentColab.

Cuando el usuario visita la aplicación, el Service Worker puede
guardar determinados archivos.

Posteriormente, si no existe conexión a Internet, el navegador
puede utilizar esos archivos almacenados en caché.

=========================================================
*/


// ========================================================
// 1. CONFIGURACIÓN DE LA CACHÉ
// ========================================================

// Nombre de la caché que utilizará la aplicación.
// Al cambiar la versión, el navegador podrá crear una nueva
// caché y eliminar la anterior.
const CACHE_NAME = "talentcolab-v1";


// ========================================================
// 2. ARCHIVOS QUE SE GUARDARÁN EN CACHÉ
// ========================================================

// Lista de archivos principales de la aplicación.
//
// Estos archivos estarán disponibles para el Service Worker
// y podrán utilizarse cuando el dispositivo tenga problemas
// de conexión.
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


// ========================================================
// 3. EVENTO INSTALL
// ========================================================

// El evento "install" se ejecuta cuando el Service Worker
// se instala por primera vez.
//
// En este evento se abre la caché y se almacenan los archivos
// principales de la aplicación.
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                console.log("Archivos guardados en caché.");

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


// ========================================================
// 4. EVENTO ACTIVATE
// ========================================================

// El evento "activate" se ejecuta cuando el Service Worker
// se activa.
//
// Aquí se eliminan cachés antiguas para evitar que el usuario
// continúe utilizando archivos desactualizados.
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cacheName => {

                        // Si la caché no corresponde con la versión
                        // actual, se elimina.
                        if (cacheName !== CACHE_NAME) {

                            return caches.delete(cacheName);

                        }

                    })

                );

            })

    );

});


// ========================================================
// 5. EVENTO FETCH
// ========================================================

// El evento "fetch" se ejecuta cada vez que la aplicación
// realiza una solicitud de red.
//
// El Service Worker revisa si el recurso solicitado existe
// dentro de la caché.
//
// Si existe:
//      Se utiliza la versión almacenada.
//
// Si no existe:
//      Se intenta obtener el recurso desde Internet.
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                // Si el recurso está en caché, se devuelve.
                if (cachedResponse) {

                    return cachedResponse;

                }

                // Si no está en caché, se solicita desde Internet.
                return fetch(event.request);

            })

    );

});


/*
=========================================================
RESUMEN DEL FUNCIONAMIENTO
=========================================================

El funcionamiento básico de este Service Worker es:

1. INSTALL
   Se instala el Service Worker y guarda archivos importantes
   de TalentColab en la caché.

2. ACTIVATE
   Se revisan las cachés existentes y se eliminan las versiones
   antiguas.

3. FETCH
   Cuando la aplicación solicita un archivo, primero se busca
   en la caché.

   Si existe:
       Se utiliza el archivo almacenado.

   Si no existe:
       Se solicita desde Internet.

---------------------------------------------------------

REQUISITOS PARA UTILIZAR UN SERVICE WORKER

Para utilizar un Service Worker correctamente:

- El archivo debe estar dentro del proyecto.
- Debe registrarse desde JavaScript.
- Normalmente debe ejecutarse mediante HTTPS.
- En desarrollo local puede utilizarse localhost.

Ejemplo de registro desde script.js:

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./serviceworker.js")
            .then(() => {
                console.log("Service Worker registrado correctamente.");
            })
            .catch(error => {
                console.error(
                    "Error al registrar el Service Worker:",
                    error
                );
            });

    });

}

---------------------------------------------------------

ESTRUCTURA RECOMENDADA DEL PROYECTO

TalentColab/
│
├── index.html
├── style.css
├── script.js
├── serviceworker.js
└── manifest.json

---------------------------------------------------------

CONCLUSIÓN

El archivo serviceworker.js es un componente importante de una
Progressive Web App (PWA), ya que permite administrar recursos
en segundo plano y utilizar estrategias de caché.

En TalentColab, su función principal es almacenar los recursos
esenciales de la aplicación para mejorar el rendimiento y
permitir que determinados recursos continúen disponibles
cuando existe una conexión limitada o no existe conexión.

=========================================================
*/
