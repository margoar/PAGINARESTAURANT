/* ==========================================================================
   Sabor de Barranco - Script principal
   Interacciones del sitio: menu movil, navegacion, filtros de la carta
   y animaciones de aparicion.
   ========================================================================== */

// Espera a que el HTML este cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------------------------
       1. Menu hamburguesa para pantallas pequenas
       ---------------------------------------------------------------------- */

    var nav = document.querySelector("nav");
    var botonMenu = document.querySelector(".boton-menu");

    if (botonMenu && nav) {

        botonMenu.addEventListener("click", function () {
            var abierto = nav.classList.toggle("abierto");

            // Avisa a los lectores de pantalla si el menu esta abierto
            botonMenu.setAttribute("aria-expanded", abierto);
            botonMenu.textContent = abierto ? "✕" : "☰";
        });

        // Al pulsar un enlace, el menu se cierra solo
        nav.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                nav.classList.remove("abierto");
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.textContent = "☰";
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. Sombra en la barra de navegacion al desplazar la pagina
       ---------------------------------------------------------------------- */

    if (nav) {
        window.addEventListener("scroll", function () {
            nav.classList.toggle("nav-fija", window.scrollY > 40);
        });
    }

    /* ----------------------------------------------------------------------
       3. Marca el enlace de la pagina actual
       ---------------------------------------------------------------------- */

    if (nav) {
        // Nombre del archivo abierto, por ejemplo "menu.html"
        var paginaActual = window.location.pathname.split("/").pop() || "index.html";

        nav.querySelectorAll("a").forEach(function (enlace) {
            var destino = enlace.getAttribute("href").split("/").pop();

            if (destino === paginaActual) {
                enlace.classList.add("activo");
            }
        });
    }

    /* ----------------------------------------------------------------------
       4. Filtros de la carta (entradas, fondos, postres, bebidas)
       ---------------------------------------------------------------------- */

    var filtros = document.querySelectorAll(".filtro");
    var platos = document.querySelectorAll(".plato");

    filtros.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Solo un filtro puede estar activo a la vez
            filtros.forEach(function (otro) {
                otro.classList.remove("activo");
            });
            boton.classList.add("activo");

            var categoria = boton.dataset.categoria;

            platos.forEach(function (plato) {
                var coincide = categoria === "todos" ||
                               plato.dataset.categoria === categoria;

                plato.style.display = coincide ? "flex" : "none";
            });
        });
    });

    /* ----------------------------------------------------------------------
       5. Animacion de aparicion al hacer scroll
       ---------------------------------------------------------------------- */

    var elementos = document.querySelectorAll(".aparece");

    if ("IntersectionObserver" in window) {

        var observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    // Una vez mostrado, ya no hace falta observarlo
                    observador.unobserve(entrada.target);
                }
            });

        }, { threshold: 0.15 });

        elementos.forEach(function (elemento) {
            observador.observe(elemento);
        });

    } else {
        // Navegadores antiguos: se muestra todo sin animacion
        elementos.forEach(function (elemento) {
            elemento.classList.add("visible");
        });
    }

    /* ----------------------------------------------------------------------
       6. Formularios de reserva y de contacto
       Sin servidor detras: se valida en el navegador y se muestra un aviso.
       ---------------------------------------------------------------------- */

    var formularios = document.querySelectorAll(".formulario");

    formularios.forEach(function (formulario) {

        var aviso = formulario.querySelector(".mensaje-form");

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            var incompletos = [];

            // Revisa los campos obligatorios uno por uno
            formulario.querySelectorAll("[required]").forEach(function (campo) {
                var vacio = campo.value.trim() === "";
                campo.classList.toggle("error", vacio);

                if (vacio) {
                    incompletos.push(campo);
                }
            });

            if (incompletos.length > 0) {
                mostrarAviso(aviso, "aviso", "Faltan datos por completar. Revisa los campos marcados.");
                incompletos[0].focus();
                return;
            }

            // El correo debe tener un formato valido
            var correo = formulario.querySelector("input[type=email]");

            if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo.value)) {
                correo.classList.add("error");
                mostrarAviso(aviso, "aviso", "Revisa el correo electrónico, parece incompleto.");
                correo.focus();
                return;
            }

            var esReserva = formulario.id === "form-reserva";

            mostrarAviso(aviso, "exito", esReserva
                ? "¡Gracias! Recibimos tu solicitud de reserva y te confirmamos por correo."
                : "¡Gracias por escribirnos! Te respondemos dentro de las próximas 24 horas.");

            formulario.reset();
        });
    });

    // Muestra el aviso debajo del boton de enviar
    function mostrarAviso(elemento, tipo, texto) {

        if (!elemento) {
            return;
        }

        elemento.textContent = texto;
        elemento.className = "mensaje-form " + tipo;
        elemento.hidden = false;
    }

    /* ----------------------------------------------------------------------
       7. Ano actual en el pie de pagina
       ---------------------------------------------------------------------- */

    var anio = document.getElementById("anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

});
