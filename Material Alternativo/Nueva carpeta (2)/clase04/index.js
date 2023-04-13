/*
    Función dentro de Función 
*/

function contenedora() {
  const sumar = (n1, n2) => console.log(n1 + n2);
}

/*
  Función Callback -> Se pasa como argumento de otra, para ser ejecutada por al función que la recibe
*/

function ejecutante(cb) {
  cb();
}

ejecutante(() => console.log("hola"));
ejecutante(() => console.log("chau"));

function metodosArray(arr, cb) {
  const nuevoArr = [];

  for (const el of arr) {
    nuevoArr.push(cb(el));
  }

  return nuevoArr;
}

const colores = ["Rojo", "Amarillo", "Verde"];

const map = metodosArray(colores, (el) => `Soy el ${el}`);
console.log(map);

const html = metodosArray(colores, (el) => `<p>Color ${el}</p>`);
console.log(html);
console.log(html.join(""));

const filter = metodosArray(colores, (el) => {
  if (el !== "Rojo") {
    return el;
  }
});
console.log(filter);

/*
  Proceso de Ejecución 
    -> Indica cómo se van a realizar las acciones declaradas en las sentencias de nuestro programa
    -> Código sincrónico que se ejecuta en un único Proceso de Ejecución (thread -hilo-)
      -> JavaScript Lenguaje de Programación single thread bloqueante.
    -> Código asincrónico qe se ejecuta en varios Procesos de Ejecución (threads -hilos-)

*/

/*
  Código Sincrónico -> Código que se ejecuta en orden de lectura
*/

//Función Anónima Auto-invocada (declarar una función que se ejecuta de forma automática)
(function () {
  //const n1 = 1;
  console.log("Inicio");
  uno();
  console.log("Fin");

  function dos() {
    console.log("dos");
  }

  function uno() {
    console.log("uno");
    dos();
    console.log("Tres");
  }
})();

//const n1 = 1;

/*
  Código Asincrónico -> Código que permite la ejecución en simultáneo de varios procesos
*/

//const n1 = 2; - error

(function () {
  //const n1 = 1;
  console.log("Inicio");
  uno();
  console.log("Fin");

  function dos() {
    function tareaDos() {
      console.log("dos");
    }
    setTimeout(tareaDos, 0);
  }

  function uno() {
    function tareaUno() {
      console.log("uno");
    }
    setTimeout(tareaUno, 0);
    dos();
    console.log("Tres");
  }
})();

/*
  AJAX -> Asynchronous JavaScript And XML
    => Conjunción de Tecnologías (HTML, CSS, JS y XMLHttpRequest)

  Ejemplo XML
    => <nombre>Pepe</nombre>
      <apellido>Pepin</apellido>
      <edad>30</edad>

  API Web XMLHttpRequest(?)
    => Permite realizar Peticiones mediante el Protocolo HTTP
     -> Protocolo HTTP - Genera las reglas para la comunicación entre el Cliente (navegador) y el Servidor ("""computadora""")
      => Cliente hace peticiones (request)
        => Headers -> Objeto de configuración de la petición
          => Método de Petición
            => GET - Quiero obtener información
            => POST - Quiero agregar información
      => Servidor genera respuestas (response)
        => Respuestas informativas (100 - 199)
        => Respuestas satisfactorias (200 - 299)
        => Re-dirección (300 - 399)
        => Errores del Cliente (400 - 499)
        => Errores del Servidor (500 - 599)
        => response: Objeto que almacena toda la información que me ofrece el servidor cuando le hago una request
          => status: código de respuesta
          => statusText: Texto de la respuesta
          => conversión del response a dato de JS permite la obtención de los valores que estamos pidiendo

  Front-end -> Se encarga de realizar la lógica para mostrar datos al usuario (generar vistas) 
    => Lógica de Armado de Vista
    => Lógica de Obtención de Datos (AJAX)
*/

/*
  Generar Vista a partir de los datos almacenados en un Array
    => 1ro - Crear el Array
    => 2do - Tomar un elemento existente en el HTML
    => 3ro - Recorrer el Array para generar elementos para insertar en el elemento existente en HTML
    => 4to - Insertar datos generados al elemento existente en el HTML
*/

const estaciones = ["Verano", "Otoño", "Invierno", "Primavera"];
const div = document.querySelector(".array");

let vista = "";
estaciones.forEach((estacion) => {
  vista += `<p>${estacion}</p>`;
});

div.innerHTML = vista;

/*
  Objeto JSON - JavaScript Object Notation
    => Dato de Tipo string pensado para la comunicación entre Cliente y Servidor
*/

const obj = {
  nombre: "Pepe",
  apellido: "Pepin",
  edad: 30,
};

//Convertir el Objeto Plano en Objeto JSON
const objJSON = JSON.stringify(obj);
console.log(objJSON);

//Convertir el Objeto JSON en Objeto Plano
const objPlano = JSON.parse(objJSON);
console.log(objPlano);

/*
  API Web -> Funcionalidad del Navegador
  API REST -> "Base de Datos"
    => Endpoint -> Ruta (url) cuyo objetivo no es mostrar un sitio, sino entregar información

  Peticiones AJAX con Objeto xhr  
*/

const url = "https://jsonplaceholder.typicode.com";

(() => {
  const xhr = new XMLHttpRequest();
  const endpoint = `${url}/users`;

  //Abrir conexión y configurar
  xhr.open("GET", endpoint);
  xhr.responseType = "json";

  //Mandar el request
  xhr.send();

  /*
    Eventos de Respuesta
      => load - Se dispara cuando obtuvimos una respuesta
        -> Incluye las respuesta de error
      => error - Se dispara si NO PUDIMOS OBTENER una respuesta
        -> Se dispara en la ausencia de respuesta
  */

  const div = document.querySelector(".ajax");

  xhr.onload = function () {
    //Siempre trabajamos con 2 posibilidades
    // -> Código de respuesta entre el rango 200 (tengo datos)
    // -> Código de respuesta en los rangos 400 y 500 (no tengo datos)

    if (xhr.status !== 200) {
      //Crear un Objeto Error
      const err = new Error(`Error ${xhr.status}: ${xhr.statusText}`);
      console.log(err);
    } else {
      console.log("Datos de Respuesta:");
      console.log(xhr.response);

      const users = xhr.response;

      div.innerHTML = users
        .map((user) => {
          return `<p>${user.name}</p>`;
        })
        .join("");
    }
  };

  console.log("Esto se ejecuta antes que la Callback de la Petición AJAX");
})();

(() => {
  //1ro - Obtener los datos del formulario cuando se envía (Evento submit)
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    //Evita el comportamiento por defecto del form (recargar la página)
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;

    //2do - Obtener archivo json mediante petición AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "users.json");
    xhr.send();

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);

        for (const user of res) {
          if (user.nombre === nombre) {
            location.href = "pages/usuario.html";
          }
        }
      }
    });
  });
})();
