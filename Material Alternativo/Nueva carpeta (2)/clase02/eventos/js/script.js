/*
    API Web (Web API) => Contiene atributos y métodos para interactuar con el navegador
    API REST => "Bases de Datos accesibles desde internet"

    BOM (Browser Object Model) => Objeto Window => API window
        => Propiedades del BOM
            => outerWidth/outerHeight - Ancho/Alto del navegador
            => innerWidth/innerHeight - Ancho/Alto del documento
        => Eventos del BOM
            => load - Se desata cuando se carga el documento HTML
            => resize - Se desata cuando cambia el tamaño de la pantalla
    DOM (Document Objet Model) => Objeto Document => API document
        => REGLA FUNDAMENTAL -> Se deben minimizar al máximo la cantidad de cambios en el DOM           
*/

/*
    Evento
        -> Mensaje que espera una Respuesta
            -> Pasó esto. ¿Qué queres hacer?
        -> Escuchar el Evento Disparado/Desatado permite pasar la Respuesta 
            -> Mediante atributo de Elemento HTML
            -> Mediante propiedad de Objeto HTML
            -> API Web EventTarget
                -> Permite agregar más de una escucha para el mismo evento
                -> objHTML.addEventListener(evento, cb)   
                -> objHTML.removeEventListener(evento, cb)   
        -> Respuesta === Función Callback
        -> Objeto Evento
            -> Las Funciones Callback sólo pueden tener un parámetro que va almacenar el Objeto Evento
        
        
        Función Callback
            -> Es una función que se pasa como argumento de otra para que la función que la recibe la ejecute

        TODAS LAS FUNCIONES SON ACCIONES
*/

/*
    Funciones Callback
*/

function fnEjecutante(pepe) {
  console.log(pepe);
  //pepe; Leer qué hay almacenado
  pepe(); //Ejecutar la fn almacenada
}

function fnCB() {
  console.log("Soy una Función Callback");
}

fnEjecutante(fnCB);
fnEjecutante(() => console.log("Soy otra Función Callback"));
fnEjecutante(function () {
  console.log("También soy Función Callback");
});

/*
    Agregar escuchas
*/

// Mediante atributo de Elemento HTML (excepción regla objeto evento)
function manejarClick() {
  const span = document.querySelector("span");
  span.innerText = " - Hiciste click";
}

//Mediante propiedad de Objeto HTML
const texto = document.querySelector("p");

texto.onmouseover = entrar;

texto.onmouseleave = function () {
  texto.classList.remove("dark");
};

function entrar() {
  texto.classList.add("dark");
}

//API Web EventTarget
const btnET = document.getElementById("btnET");

btnET.addEventListener("click", clickBtn);
btnET.addEventListener("click", () => {
  //console.log(e);
  //console.log(`Hola ${nombre}`);
  console.log("Hiciste click");
  //La callback sólo se ejecuta 1 vez
  btnET.removeEventListener("click", clickBtn);
});

function clickBtn() {
  console.log("Yo también reacciono al click");
}

/*
    Objeto Evento
*/

const link = document.querySelector("a");

link.addEventListener("click", (e) => {
  e.preventDefault();
  const spans = document.querySelectorAll("span");
  //console.log(spans);

  spans[1].innerText = " - Tengo mi comportamiento por defecto prevenido";
});

const form = document.querySelector("form");

form.addEventListener("click", manejarSubmit);

function manejarSubmit(e) {
  //console.log(e);
  e.preventDefault();

  const input = document.querySelector("#nombre");
  console.log(input.value);

  //Limpiar el input después de usar el dato obtenido
  input.value = "";
}

//manejarSubmit();

/*
    Fases de Evento (Propagación)
*/

//capturing

function propagacion(e) {
  console.log(this); //Quiero ver cuál es el elemento dentro del que se está ejecutando está función (la función está guardada en Objeto window)

  console.log(
    `Hola te saluda ${this.className}, el click se originó en ${e.target.className}`
  );
}

const divCapture = document.querySelectorAll(".capture div");
divCapture.forEach((div) => div.addEventListener("click", propagacion, true));

//bubbling

const divBubble = document.querySelectorAll(".bubble div");
divBubble.forEach((div) => div.addEventListener("click", propagacion, false));

/*
    .stopPropagation
*/

function sinPropagacion(e) {
  e.stopPropagation();
  console.log(
    `Hola te saluda ${this.className}, el click se originó en ${e.target.className}`
  );
}

const divStop = document.querySelectorAll(".stopPropagation div");
divStop.forEach((div) => div.addEventListener("click", sinPropagacion));

/*
    Delegación de Eventos
*/

function delegacion(e) {
  console.log(
    `Hola te saluda ${e.target.className}, el click se originó en ${e.target.className}`
  );
}

const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".delegacion div")) {
    delegacion(e);
  } else if (target.id === "btnDinam") {
    saludo("Pepe");
  }
});

//const botonDinam = document.getElementById("btnDinam");
//console.log(botonDinam);

function saludo(nombre) {
  console.log(`Hola ${nombre}`);
}
