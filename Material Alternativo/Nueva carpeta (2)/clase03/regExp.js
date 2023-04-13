/*
  Las expresiones regulares son patrones que proporcionan forma de buscar y reemplazar texto. 
  En JavaScript cobran especial relevancia porque, además, nos permiten generar validaciones.
  Están disponibles a través del objeto RegExp y se encuentran integrados en los métodos de String. 
*/

//const rexExp = new RegExp("patrón", "bandera");
const rexExp = /patrón/;

/*
  Banderas -> Elementos que afectan a la búsqueda
    => i (no distingue entre mayúsculas y minúsculas) 
    => g (Si no se pone, sólo se obtiene la primera coincidencia)
  
  Conjuntos [] -> retornan true cuando se encuentra alguno de los caracteres declarados dentro de los corchetes
*/

let regExpSBs = /[A-Z]/;
console.log("aZdR".match(regExpSBs));
let regExpCBs = /[A-Z]/g;
console.log("aZdR".match(regExpCBs));
regExpCBs = /[A-Z]/gi;
console.log("aZdR".match(regExpCBs));

/*
  Clases de Caracteres -> Notación especial que coincide con cualquier símbolo de un determinado conjunto
    => Inclusivas (coincide con el conjunto)
      => . -> Cualquier carácter excepto nueva línea
      => \d -> Cualquier dígito
      => \s -> Símbolos de espacio, tabulaciones, nuevas líneas
      => \w -> letras (sin acentos ni caracteres especiales), dígitos y guion bajo
    => Exclusivas (coincide con lo que NO sea parte del conjunto)
      => \D -> No quiero dígitos
      => \S -> No quiero símbolos.....
      => \W -> No quiero letras, dígitos y guion bajo
*/

regExpSBs = /\w/;
console.log("aZdR".match(regExpSBs));
regExpSBs = /[.\D]/;
console.log("123456 _uno".match(regExpSBs));
regExpCBs = /\w/gi;
console.log("aZdR1_".match(regExpCBs));
regExpCBs = /[.\D]/gi;
console.log("123456 _uno".match(regExpCBs));

/*
  Anclas -> Obligan a verificar la condición principio/fin de texto
    => ^ inicio -> La RegExp debe encontrarse al inicio de la cadena
    => $ final -> La RegExp debe encontrarse al final de la cadena
    => ^RegExp$ -> La RegExp debe coincidir de principio a fin con la cadena
*/

regExpSBs = /^perro/;
console.log("Gato y perro".match(regExpSBs));
console.log("Perro y gato".match(regExpSBs));
console.log("perro y gato".match(regExpSBs));

regExpSBs = /perro$/;
console.log("Gato y perro".match(regExpSBs));
console.log("Gato y Perro".match(regExpSBs));
console.log("perro y gato".match(regExpSBs));

regExpSBs = /^Gato y perro$/;
console.log("Gato y perro".match(regExpSBs));
console.log("Gato y Perro".match(regExpSBs));
console.log("perro y gato".match(regExpSBs));

regExpCBs = /^perro/gi;
console.log("Gato y perro".match(regExpCBs));
console.log("Perro y gato".match(regExpCBs));
console.log("perro y gato".match(regExpCBs));

regExpCBs = /perro$/gi;
console.log("Gato y perro".match(regExpCBs));
console.log("Gato y Perro".match(regExpCBs));
console.log("perro y gato".match(regExpCBs));

regExpCBs = /^Gato y perro$/gi;
console.log("Gato y perro".match(regExpCBs));
console.log("Gato y Perro".match(regExpCBs));
console.log("perro y gato".match(regExpCBs));

/*
  Escapar Caracteres y Límites de palabra
    => Escapar caracteres permite utilizar caracteres que significan algo en una REgExp (Ej: .) como su valor de lectura
    => Límite de Palabra permite buscar un texto dentro del texto
*/

regExpSBs = /\bJavaScript\b/;
console.log(
  "JavaScript es un gran lenguaje. No confundir JavaScript con Java".match(
    regExpSBs
  )
);

regExpSBs = /\blenguaje\. No confundir\b/;
console.log(
  "JavaScript es un gran lenguaje. No confundir JavaScript con Java".match(
    regExpSBs
  )
);

regExpCBs = /\bJavaScript\b/gi;
console.log(
  "JavaScript es un gran lenguaje. No confundir JavaScript con Java".match(
    regExpCBs
  )
);

/*
  Conjuntos
    => [] - retornan true cuando se encuentra alguno de los caracteres declarados dentro de los corchetes
    => [^] - retornan true cuando NO se encuentra alguno de los caracteres declarados dentro de los corchetes
    => () - permite encontrar palabras que comparten caracteres

  Rangos
    => [0-5] - retorna true si se encuentra un dígito entre el 0 y el 5   
    
  Cuantificadores
    => {n} - n cantidad de caracteres 
    => {x,n} - entre x y n cantidad de caracteres
    => {n,} - desde n cantidad de caracteres
    Abreviaciones
      => + = {1,}
      => ? = {0,1}
      => * = {0,}

  Grupos de Captura - Se crean combinando conjuntos de paréntesis y cuantificadores
    => ()+ - Al menos una coincidencia de la RegExp al completo      
*/
regExpSBs = /Java(Script)?/;
console.log(
  "JavaScript es un gran lenguaje. No confundir JavaScript con Java".match(
    regExpSBs
  )
);

regExpCBs = /Java(Script)?/g;
console.log(
  "JavaScript es un gran lenguaje. No confundir JavaScript con Java".match(
    regExpCBs
  )
);

regExpCBs = /\.(png|jpe?g|webp)/g;

console.log(
  "Una imagen puede tener extensión .jpg. No confundir con .jpeg. Además existe el .png y, recientemente, se creo un formato especial para web conocido como .webp".match(
    regExpCBs
  )
);

regExpCBs =
  /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[$@!_¡?])[A-z\d$@!_¡?]{8,16}$/g;
console.log("_UnaPass_123".match(regExpCBs));
console.log("UnaPass_".match(regExpCBs));
console.log("UnaPass_23".match(regExpCBs));

/*
    Objeto String - Contiene todo lo que podemos hacer con los string
        => .includes -> retorna un booleano si el string incluye el dato pasado
        => .indexOf -> simil find. Funciona para datos de tipo string y Arrays
        => .split(separador) -> inverso del .join()
        => .match(RegExp) -> Retorna un array con todos los elementos que coincidan con la RegExp. Si no retorna null
            => Se utiliza para validar datos
        
*/

const texto = "Hola Mundo!";
console.log(texto.includes("H"));
console.log(texto.indexOf("a"));
const arr = texto.split("");
console.log(arr);
const textoArr = arr.join("");
console.log(textoArr);

/*
    Condiciones
        => Expresión lógica (ej. n1 < n2)
        => La existencia, o no, de un valor almacenado en una variable
            => "" || 0 -> Valores falsy
*/

let unTexto = "";

if (unTexto) console.log("true");

/*
    Validar
        => Serie de pasos que aplicamos para asegurarnos que nuestros programas reciben los datos que necesitan para realizar su trabajo de forma correcta
*/

const sumar = (n1, n2) => {
  const num1 = Number(n1);
  const num2 = Number(n2);
  //console.log(num1);
  //console.log(num2);

  //Validar números
  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return "No me diste 2 números. No puedo sumar";
    //return -> romper ejecución
    //Todo lo que está por debajo, se ignora
  }

  //Código cuando tengo 2 números
  return num1 + num2;
};

console.log(sumar("asd", 2));
console.log(sumar("1", 2));
console.log(sumar(2, 2));

//Validar que en un texto sólo se ingresen números enteros positivos
const numEnteros = "123456";
const resultadoMatch = numEnteros.match(/^[0-9]+$/);
console.log(resultadoMatch);

if (numEnteros.match(/^[0-9]+$/)) console.log("true");
