import {arrTamagotchis} from "./tamagotchi-data.js";

// Atributos
const PERSONALIDAD = document.getElementById("personalidad");
const NOMBRE = document.getElementById("nombre");
const IMG = document.getElementById("img");
const FIRST = document.getElementById("first");
const P_PERSONALIDAD = document.getElementById("p_personalidad");
const P_NOMBRE = document.getElementById("p_nombre");
const FELICIDAD = document.getElementById("felicidad");
const LIMPIEZA = document.getElementById("limpieza");
const ENERGIA = document.getElementById("energia");
const RESPONSABILIDAD = document.getElementById("responsabilidad");

// Botones
const CREAR_BTN = document.getElementById("crear");
const VOLVER_BTN = document.getElementById("volver");
const DUCHAR_BTN = document.getElementById("duchar");
const ALIMENTAR_BTN = document.getElementById("alimentar");
const JUGAR_BTN = document.getElementById("jugar");
const DORMIR_BTN = document.getElementById("dormir");
const REPRENDER_BTN = document.getElementById("reprender");
const ACARICIAR_BTN = document.getElementById("acariciar");
const SELECT = document.getElementById("select");
const DIALOG = document.getElementById("dialog");
const DIALOG_BTN = document.getElementById("dialog_btn");

// Temporizador
let intervalo = null;

// Objecto para Tamagotchi
let tgch = null;

//Hay que poner el array en lugar de this
const handleActualizar = () => {
    let state = null;

    // Solo ejecuta si tgch ya está definido
    if (tgch) {
        // Obtiene los valores de los atributos
        state = tgch.actualizar();

        // Actualizar la parte visual
        FELICIDAD.innerHTML = ("⚪".repeat(state.f));
        RESPONSABILIDAD.innerHTML = ("⚪".repeat(state.r));
        LIMPIEZA.innerHTML = ("⚪".repeat(state.l));
        ENERGIA.innerHTML = ("⚪".repeat(state.e));
        
        // Mostrar Game Over si muere (cuando un atributo es en zero)
        if (state.v == false) {
            clearInterval(intervalo);
            DIALOG.showModal();
            IMG.src = tgch.arrayImagenes[1];
        }
    }
}

// Acciones
//
const handleDuchar = () => {
    tgch.duchar();
    handleActualizar();
}

const handleAlimentar = () => {
    tgch.alimentar();
    handleActualizar();
}

const handleJugar = () => {
    tgch.jugar();
    handleActualizar();
}

const handleDormir = () => {
    tgch.dormir();
    handleActualizar();
}

const handleReprender = () => {
    tgch.reprender();
    handleActualizar();
}

const handleAcariciar = () => {
    tgch.acariciar();
    handleActualizar();
}

// Resta 1 de cada atributo cada 5 segundos
const handleTiempo = () => {
    tgch.tiempo();
    handleActualizar();
}

// Function que deja activate y desactivar los butones con setButtonsDisabled = true/false
const setButtonsDisabled = (valor) => {
    DUCHAR_BTN.disabled = valor;
    ALIMENTAR_BTN.disabled = valor;
    JUGAR_BTN.disabled = valor;
    DORMIR_BTN.disabled = valor;
    REPRENDER_BTN.disabled = valor;
    ACARICIAR_BTN.disabled = valor;
}

const handleCrear = () => {
    let contin = false;

    // Elegir tipo de Tamagotchi en array de Tamagotchis
    if (SELECT.value == "Peluche") {
        tgch = arrTamagotchis[0];
        contin = true;
    }
    else if (SELECT.value == "Pixel") {
        tgch = arrTamagotchis[1];
        contin = true;
    }
    else {
        alert("Tienes que elegir un Tamagotchi");
    }
    
    // Solo ejecuta si se ha elegido un tipo de Tamagotchi
    if (contin == true) {
        tgch.crear();
        handleActualizar();
        tgch.nombre = NOMBRE.value;
        tgch.personalidad = PERSONALIDAD.value;

        // Esconde menu y añade el nombre, personalidad y el imagen correcto elegido
        FIRST.classList.add("hidden");
        P_NOMBRE.innerHTML = tgch.nombre;
        P_PERSONALIDAD.innerHTML = tgch.personalidad;
        IMG.src = tgch.arrayImagenes[0];

        // Ejecuta cada 5 segundos una funcion que resta 1 punto de cada atributo del Tamagotchi
        intervalo = setInterval(handleTiempo, 5000);

        // Activar los botones para las acciones
        setButtonsDisabled(false);
    }
}

const handleVolver = () => {
    // Muestra el menu
    FIRST.classList.remove("hidden");

    // Parar el temporizador que ejecuta handleTiempo cada 5 segundos
    clearInterval(intervalo);

    // Volver a los valores iniciales de los atributos del Tamagotchi
    tgch.reiniciar();

    // Actualizar la parte visual
    handleActualizar();
    P_PERSONALIDAD.innerHTML = "...";
    P_NOMBRE.innerHTML = "...";
    IMG.src = "./img/pixel.jpg";

    // Descactivar los botones para las acciones
    setButtonsDisabled(true);
}

// Añadir los butones para las acciones
DUCHAR_BTN.addEventListener("click", handleDuchar);
ALIMENTAR_BTN.addEventListener("click", handleAlimentar);
JUGAR_BTN.addEventListener("click", handleJugar);
DORMIR_BTN.addEventListener("click", handleDormir);
REPRENDER_BTN.addEventListener("click", handleReprender);
ACARICIAR_BTN.addEventListener("click", handleAcariciar);

// Activar los botones para crear y volver
CREAR_BTN.addEventListener("click", handleCrear);
VOLVER_BTN.addEventListener("click", handleVolver);

// Game Over dialog
DIALOG_BTN.addEventListener("click", () => {
    if (tgch) {
        handleVolver();
    }
    DIALOG.close();
});

// Asegura que al principio el dialogo está cerrado y los botones descactivados
DIALOG.close(); // Schließt den Dialog sofort beim Laden der Seite
setButtonsDisabled(true);