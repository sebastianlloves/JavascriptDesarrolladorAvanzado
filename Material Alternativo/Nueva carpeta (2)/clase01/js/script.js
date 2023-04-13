/*
    Declaración de Variables
        => var
            -> Sólo reconoce 2 scope Global y del Función
            -> Genera una clave el Objeto window 
        => let y const
            => Reconoce el Scope del Bloque de Código
            => No generan clave en el Objeto window    
        => let
            -> La variable puede su valor asignado a lo largo del programa. 
            -> Podes declararla sin asignarle valor
        => const
            -> La variable NO puede cambiar su valor asignado a lo del programa
            -> NO se puede declarar sin asignarle un valor
            -> Las constantes que almacenan datos primitivos se escriben con MAYÚSCULAS
            -> Las constantes que almacenan datos abstractos (arrays, funciones, objetos) se con camelCase

    Scope(ámbito) de Variable
        => Dónde puedo utilizar la variable
        => Global (variables globales)
            -> Pueden ser usadas en cualquier parte del código
        => Local (variable locales)
            -> Sólo pueden ser usadas en el Bloque de Código que las contiene
        => Bloque de Código
            -> Todo el código que se encuentra dentro de un par de llaves
                => {...Esto es un Bloque de Código...}

    Objeto window
        => API web
            => Código que me permite acceder a funcionalidades del Navegador
        => API Web BOM (Browser Object Model)
            => Almacena todo lo que podemos hacer en un Navegador 
            => Objeto window
                -> Almacena toda la información que está almacenada en un documento HTML y todas las funcionalidades que me permiten manipular el Navegador 
                => API Web DOM (Document Object Model)    
                    => Almacena todo lo que podemos hacer con los elementos del documento HTML      
                    => Generar un Objeto HTML
                        => Tiene toda la información del elemento seleccionado y todo los elementos que nos permiten interactuar con dicho elemento
                            -> document.querySelector(selectorCSS)
                                -> Toma el primer elemento que corresponda al selector CSS pasado
                            -> document.getElementById(id)
                                -> Toma el elemento cuyo atributo id corresponda
                            -> document.querySelectorAll(selectorCSS)
                                -> Genera un array-like que almacena todos los elementos que correspondan con el selector CSS pasado



*/

//Objeto window
console.log(window);
console.log(unaVar);
console.log(unaLet);
console.log(PI);
//Name Shadowing
function unSaludo() {
  console.log("Hola desde archivo script.js");
}

//var
var unaVarGlobal = "Tengo Scope global. Me pueden usar en cualquier parte";

function unVar() {
  var unaVarLocal =
    "Tengo un Scope local, porque sólo me pueden usar dentro de esta función";

  if (true) {
    var localIf = "Estoy en el Scope de if";
    //var localIf = "algo";
  }

  console.log(localIf);
}

unVar();

//let
let unaLetGlobal = "Tengo Scope global. Me pueden usar en cualquier parte";

function unLet() {
  let unaLetLocal =
    "Tengo un Scope local, porque sólo me pueden usar dentro de esta función";

  if (true) {
    let localIf = "Estoy en el Scope de if";
    console.log(localIf);
  }
}

unLet();

let nombre; //Declarar - Dejar disponible el espacio en memoria (clave nombre)
nombre = "Pepe"; //Asignar - Utilizar el espacio disponible para guardar algo (nombre: "Pepe")

//const
const NOMBRE = "Pepa";
//NOMBRE = "Pepito";

const arr = ["dato 1", "dato 2", "dato 3"];
console.log(arr[1]); //La clave arr almacenada en la memoria contiene un array. Mostrame qué hay en el cajón con el índice 1
arr.push("dato 4"); // La clave arr almacenada en la memoria contiene un array. Agregale un cajón y guardá el dato "dato 4"
console.log(arr);
//arr = {};

/* const unArr = new Array();
console.log(unArr); */

/*
    Tipos Datos (representación de elementos reales)
        => Primitivos (otorgados por el lenguaje)
            -> string - Valor alfanumérico que representa un texto 
            -> number - Valor numérico que representa operaciones matemáticas
            -> BigInt - Valor numérico grande 2324n
            -> boolean - Valor true/false que representa un estado
            -> undefined - Una variable declarada, que no tiene tipo dato ni valor
            -> null - Una variable declarada, que tiene tipo de dato pero no tiene valor
        => Datos Abstractos (creados por el programador usando datos primitivos y/u otros datos abstractos)
            -> Arrays
            -> Objetos
            -> Funciones

    En JavaScript, las variables reciben su tipo de dato del valor asignado

    Ejemplo Lenguaje Fuertemente Tipado
    
    string unVar; //tipo de dato: string (null)
    unVar = 1; //Error, no podes guardar dato de tipo int
    var unUndefined; 

    Programación Orientada a Objetos
        => Clases -> "Plantillas"
        => Objetos -> "Copias de la Plantillas"
*/

const h2 = document.querySelector("h2"); //Anda al HMTML, buscá el primer elemento h2 que aprezca y guardá en la constante h2 el Objeto HTML con los datos de ese elemento
console.log(h2);

/*
    condiciones
        => Pregunta que se responde por sí o no
        => Operadores lógicos
            -> n1 > n2
        => ¿Hay algo almacenado en la variable x?
            -> string, number, function, etc (sí)
            -> undefined/null -> (no)
                -> "" || 0 (no - falsies)

*/

let datoString = "";
if (datoString) {
  console.log("Hay algo almacenado");
}

let datoNumber = 0;
if (datoNumber) {
  console.log("Hay algo almacenado");
}

/*
    Funciones (Objeto Function) - Tipo de Dato Ejecutable
        => name: nombre de la función
        => code: almacena el código
        => valor de this
            -> Almacena la información de la memoria del elemento en donde se está ejecutando la función
        => Podemos saber dónde se almacena (Memoria del contenedor en que declarada)  
        => El lugar de ejecución puede ser distinto del lugar de la declaración  
        => Función Declarada
            -> usan el nombre otorgado, para crear la clave en la memoria que las contiene
        => Funciones Expresadas (anónimas)
            -> requieren la declaración de un espacio de almacenamiento que las contenga
            -> Arrow Function
                -> Si sólo usamos una línea de código, podemos omitir la palabra reservada return (return implícito)
                -> Si sólo usamos una línea de código, podemos omitir las llaves
                -> Si sólo usamos un parámetro, podemos omitir los paréntesis
                -> De forma automática, las arrow function toman el this del elemento que las contiene (La memoria en que está guardado el elemento que las contiene)

*/

//Declaración
function fnDeclarada() {
  console.log("Función Declarada");
}

//Ejecución
fnDeclarada();

const fnExpresada = function () {
  console.log("Función Expresada (anónima)");
};

const suma = (n1, n2) => n1 + n2;
let resultado = suma(2, 2);
console.log(resultado);
resultado = suma(4, 3);
console.log(resultado);

/* const saludar = nombre => console.log(`Hola ${nombre}`);
saludar("Pepe"); */

window.nombre = "Pepa";

const obj = {
  nombre: "Pepe",
  saludar: () => console.log(this.nombre),
};

obj.saludar();

const obj1 = {
  nombre: "Pepito",
  saludar() {
    console.log(this.nombre);
  },
};

obj1.saludar();

/*
    Función Callback -> Función que se pasa como argumento de otra para que la función que la recibe se encargue de ejecutarla
*/

const colores = ["Rojo", "Amarillo", "Verde"];
const nombres = ["Pepe", "Pepa", "Pepito"];

function encontrar(arr, cb) {
  const nuevo = [];
  const longitud = arr.length;

  for (let index = 0; index < longitud; index++) {
    const element = arr[index];
    let encontrado;
    if (cb(element)) encontrado = element;
    if (encontrado) nuevo.push(encontrado);
  }

  return nuevo;
}

const color = encontrar(colores, (element) => element === "Amarillo");
console.log(color);
const nombreEncontrado = encontrar(nombres, (nombre) => nombre === "Pepito");
console.log(nombreEncontrado);

/*
    Métodos del Objeto Array
*/

const numeros = [1, 2, 3, 4, 5, 6, 7];

//forEach -> Función Callback toma 2 parámetro(el segundo es opcional). 1ro parámetro que almacena el elemento actual, 2do parámetro que almacena el valor de índice. No tiene return (siempre retorna undefined)

function cbForEach(elemento, indice) {
  console.log(`${elemento} en índice: ${indice}`);
}
function cbForEach1(elemento) {
  console.log(`${elemento}`);
}

numeros.forEach(cbForEach);
numeros.forEach(cbForEach1);

//map -> Función Callback toma 2 parámetro(el segundo es opcional). 1ro parámetro que almacena el elemento actual, 2do parámetro que almacena el valor de índice. Retorna un nuevo Array. Se usa para generar una copia de un Array. Solemos modificar los valores

const multiplo2 = numeros.map((num) => num * 2);
console.log(numeros);
console.log(multiplo2);

//filter - Retorna un nuevo Array que no contiene los valores que hacen que la condición de true

const sinCuatro = numeros.filter((num) => num != 4);
console.log(sinCuatro);

//find - Retorna un nuevo Array el primer elemento que genera que la condición de true

const mayoresCuatro = numeros.find((num) => num > 4);
console.log(mayoresCuatro);

//includes - Retorna un true/false para indicar la existencia de un elemento en el Array
const existe = numeros.includes(5);
console.log(existe);
