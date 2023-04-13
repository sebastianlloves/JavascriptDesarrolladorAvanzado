/*
    Objetos/Arrays
        => Trabajan por referencia. Asignar un Objeto/array almacenado en un espacio de memoria, genera una referencia al espacio de memoria
*/

(() => {
  const user = {
    nombre: "Pepe",
    pass: 1234,
  };

  //Para saber qué hay en copiaUser, mira user
  const copiaUser = user;

  console.log(user);
  console.log(copiaUser);

  //Modificar copiaUser === modificar user
  copiaUser.nombre = "Pepa";

  console.log(user);
  console.log(copiaUser);
})();

/*
    Spread Operator
        => Toma los valores de un Objeto/Array y los copia en otro Objeto/Array
*/

(() => {
  const user = {
    nombre: "Pepe",
    pass: 1234,
  };

  //Crea un nuevo Objeto y almacena las claves que tiene user
  const copiaUser = { ...user };

  console.log(user);
  console.log(copiaUser);

  //Modificar copiaUser !== modifica user
  copiaUser.nombre = "Pepa";

  console.log(user);
  console.log(copiaUser);

  const nuevaCopia = {
    ...user,
    nombre: "Pepin",
  };

  console.log(nuevaCopia);
})();

/*
    Funciones SON ESPACIOS DE ALMACENAMIENTO EJECUTABLES
        => armar una función === crear un contenedor para las líneas de código que se puede ejecutar
        => Para ejecutar el contenido de nuestro espacio de memoria, debemos combinar el nombre con paréntesis
            -> unaFn - Muestra qué hay en el espacio de memoria unaFn
            -> unaFn() - Ejecuta el código almacenado en el espacio de memoria unaFn
*/

function algo() {
  console.log("Hacer algo");
}

console.log(algo);
algo();

var unaVariable = "algo";

console.log(window);

/*
    Función Callback
        => Función que se pasa como argumento de otra para se ejecutada por la función que la recibe
*/

function fnEjecutante(arr, cb) {
  const nuevo = [];

  for (const el of arr) {
    if (cb(el)) {
      nuevo.push(el);
    }
  }

  return nuevo;
}

const filtrarPepe = fnEjecutante(
  ["Pepe", "Pepa", "Pepin"],
  (el) => el !== "Pepe"
);
console.log(filtrarPepe);
const filtrarMayores4 = fnEjecutante(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  (el) => el <= 4
);
console.log(filtrarMayores4);

/*
    Función de Orden Superior
        => Reciben(o no) las funciones callback. 
        => Pueden(o no) retornar un valor que tiene acceso a su espacio de memoria
        => Permiten la creación de los Closure
            -> Debe ser visible (debe haber una función que retorne otra)
            -> Un Closure permite encapsular valores para evitar que se modifiquen por agentes externos
*/

//fnSuperior se almacena en el Objeto window (es contenida por el Objeto window)
function fnSuperior() {
  const arr = ["dato 1", "dato 2", "dato 3", "dato 4"];

  //unaFn se almacena en fnSuperior (es contenida por fnSuperior)
  function unaFn() {
    //arr.push(dato);
    console.log(arr);
  }

  //Hacer disponible una referencia a la función unaFn contenida en este espacio de memoria (fnSuperior)
  return unaFn;
}

//Almacenar en laFn la referencia a la función unaFn contenida en fnSuperior
const laFn = fnSuperior();

//Para ejecutar, se busca el espacio de memoria que contiene a la referencia almacenada (unaFn en fnSuperior)
laFn();

//arr.push("dato 5");

/*
    Las funciones pueden ser calificadas por los valores que modifican/usan
        => Funciones con Efecto Secundario
            -> Utilizan/modifican valores que no están contenidos dentro de la función
        => Funciones Puras
            -> Sólo utilizan/modifican valores que contienen
            -> Si reciben los mismos valores, retornan los mismos resultados
*/

//Función con Efecto Secundario
const obj = {
  nombre: "",
};

function cambiarNombre(nombre) {
  obj.nombre = nombre; //Efecto secundario -> mutación
}

//Antes de ejecutar
console.log("Valor almacenado en la clave nombre:", obj.nombre);
//Después de ejecutar
cambiarNombre("Pepe");
console.log("Valor almacenado en la clave nombre:", obj.nombre);

//Función Pura
const sumar = (n1, n2) => n1 + n2;
console.log("Resultado de la suma:", sumar(2, 2));
console.log("Resultado de la suma:", sumar(2, 5));
console.log("Resultado de la suma:", sumar(2, 5));
console.log("Resultado de la suma:", sumar(2, 5));
console.log("Resultado de la suma:", sumar(2, 5));
console.log("Resultado de la suma:", sumar(2, 5));
console.log("Resultado de la suma:", sumar(2, 5));

/*
    Paradigma de la Programación Funcional
        => Realizar nuestro código utilizando funciones
            -> Evitar mutaciones (principio de inmutabilidad)
            -> Evitar efectos secundarios
*/

const state = {
  nombre: "",
};

function actualizarState(state, nuevoValor) {
  return {
    ...state,
    nombre: nuevoValor,
  };
}

const nuevoState = actualizarState(state, "Pepe");

console.log(state);
console.log(nuevoState);

/*
    this (Contexto de Ejecución)
        => Una función puede no ser ejecutada en el espacio de memoria en que se declarada
        => () === Ejecuta un código almacenado en una clave que se encuentra en un espacio de memoria
        => this almacena el espacio de ejecución actual
        => Las Arrow Function utilizan el espacio de memoria del Objeto que contiene al Objeto que las ejecuta
*/

//Crear una clave nombre en el Objeto window
this.nombre = "Pepe";

//Función escrita en el Objeto window
function saludo() {
  console.log(`Hola ${this.nombre}`);
}

const unObjeto = {
  nombre: "Pepa",
  saludo: saludo, //Almacenar una referencia a la función guardada en la clave saludo del Objeto window
};

const otroObjeto = {
  nombre: "Pepin",
  saludo, //Almacenar una referencia a la función guardada en la clave saludo del Objeto window
};

const objArrow = {
  //Función escrita en el Objeto unObjeto
  saludoArrow: () => console.log(`Hola ${this.nombre}`),
};

//saludo();
window.saludo(); //Para llegar a la ejecución: entrar al Objeto window, buscar la clave saludo, ejecutar el código (espacio de ejecución actual: window)

unObjeto.saludo(); //Para llegar a la ejecución: entrar al Objeto unObjeto, buscar la clave saludo, ejecutar el código (espacio de ejecución actual: unObjeto)

otroObjeto.saludo(); //Para llegar a la ejecución: entrar al Objeto otroObjeto, buscar la clave saludo, ejecutar el código (espacio de ejecución actual: otroObjeto)

objArrow.saludoArrow(); //Para llegar a la ejecución: entrar al Objeto objArrow, buscar la clave saludoArrow, ejecutar (Es ejecuta por objArrow, pero usa la memoria del Objeto window por el Objeto window contiene a objArrow)

/* 
    Array desprotegido
*/

const unObj = {
  arr: ["dato 1", "dato 2", "dato 3"],
};
console.log(unObj);
unObj.arr.push("dato 4");
//console.log(unObj);

/*
    Patrón Iterador (Objeto iterable)
        => Permite crear un Array protegido
        => Creamos un Objeto que almacene un Array y funciones que permiten acceder a los valores de ese Array
        => La creación del Objeto se hace mediante una función
*/

//La función crearIterable es un espacio de memoria
function crearIterable(array) {
  //Claves almacenadas en el espacio de memoria crearIterable
  this.arr = array;
  this.index = 0;
  this.hasNext = () => this.index + 1 > this.arr.length;

  //El objeto retornado se almacena en el espacio de memoria crearIterable. Es, además, un espacio de memoria
  return {
    //Funciones obligatorias
    first: () => this.arr[0],
    current: () => this.arr[index],
    next: () => {
      this.index++;
      return {
        value: this.arr[this.index],
        done: this.hasNext(),
      };
    },
    //Funciones frecuentes
    hasNext,
    reset: () => {
      this.index = 0;
    },
    //Adicionales
    back: () => {
      this.index--;
      return this.arr[this.index];
    },
  };
}

//Crear un Espacio de Memoria (Objeto) Iterable
const iterador = crearIterable(["dato 1", "dato 2", "dato 3"]);
console.log("Valor almacenado en iterador", iterador);

//Iterador almacena un Espacio de Memoria (Objeto)
const primerValor = iterador.first();
console.log("Primer valor en el Array", primerValor);
let siguiente = iterador.next();
console.log("Siguiente valor en el Array", siguiente);
siguiente = iterador.next();
console.log("Siguiente valor en el Array", siguiente);
//console.log(iterador.arr);
iterador.reset();
siguiente = iterador.next();
console.log("Siguiente valor en el Array", siguiente);
let anterior = iterador.back();
console.log("Valor anterior en el Array", anterior);

const iterarNombres = crearIterable(["Pepe", "Pepa", "Pepin"]);
console.log(iterarNombres.first());
console.log(iterarNombres.next());

const iterarNumeros = crearIterable([1, 2, 3, 4]);
console.log(iterarNumeros.first());
console.log(iterarNumeros.next());

/*
    Programación Reactiva
        => Paradigma de Programación Funcional
            -> Principio de Inmutabilidad
            -> Funciones Puras
        => Patrón Iterable
            -> Protege los valores de trabajo
        => Patrón Observer
            -> Objeto Observable 
                -> Almacena el estado actual de la aplicación
                -> Avisa los cambios de estado
            -> Objeto Observador
                -> Escucha el aviso y genera una reacción
*/

/*
    Patron Observador
*/

function crearObservable() {
  return {
    estado: {
      nombre: "",
    },
    suscriptores: [],
  };
}

function crearObservador(reaccionar) {
  return {
    notificado: reaccionar,
  };
}

const observable = crearObservable();
const observador = crearObservador();
