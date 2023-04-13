/*
    Objeto Array - Contiene todo lo que podemos hacer con los array
        => .forEach - Recorrer el Array sin retornar
        => .map - Recorrer el Array y retornar un nuevo Array. Se usa para crear una copia modificada
        => .filter - Recorrer el Array y retornar un nuevo Array. El Array retornado NO tiene los elementos que generen un true en la condición pasada
        => .find - Recorrer el Array y retornar el valor que genere true en la condición pasada
        => .join(unificador) -> Toma los elementos de un Array y utiliza el valor pasado en el unificador, para generar un dato de tipo string
            -> .join("") -> Toma el Array y genera un dato de tipo string con todos los valores juntos
*/

const colores = ["Rojo", "Amarillo", "Verde"];

/*
    For
*/
const divFor = document.querySelector(".for");

let htmlArr = "";
for (const item of colores) {
  htmlArr += `<p>Soy el color: ${item}</p>`;
}
console.log(htmlArr);
divFor.innerHTML = htmlArr;

/*
    .map y .join
*/
const divMap = document.querySelector(".map");

const html = colores.map((color) => `<p>Soy el color: ${color}</p>`).join("");
console.log(html);
divMap.innerHTML = html;

/*
    Armar un map
*/

function unMap(arr, cb) {
  const newArr = [];
  for (const item of arr) {
    newArr.push(cb(item));
  }
  return newArr;
}

const unHtml = unMap(colores, (color) => `<p>Soy el color: ${color}</p>`).join(
  ""
);
console.log(unHtml);
