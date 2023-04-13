/*
  API Web Storage
*/

//Almacenar (crear)
const objPlano = { nombre: "pepe" };
const objJSON = JSON.stringify(objPlano);
//console.log(objJSON);
//localStorage.setItem("usuario", objJSON);
//sessionStorage.setItem("usuario", objJSON);

//Leer (get)
const datoStorage = localStorage.getItem("usuario");
console.log(datoStorage);
const objUser = JSON.parse(datoStorage);
console.log(objUser);

//Verificar existencia de dato
window.addEventListener("DOMContentLoaded", () => {
  const existeView = document.getElementById("existe");
  const noExisteView = document.getElementById("noExisteView");

  //console.log(localStorage.getItem("carrito"));
  if (!localStorage.getItem("carrito")) {
    //console.log("No existe ese dato");
    existeView.classList.add("none");
    noExisteView.classList.remove("none");

    noExisteView.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreProducto = document.getElementById("nombreProducto");

      localStorage.setItem("carrito", nombreProducto.value);

      nombreProducto.value = "";
    });
  } else {
    existeView.classList.remove("none");
    noExisteView.classList.add("none");
  }
});

//Modificar
localStorage.setItem("carrito", "pc");
//location.reload();

//Borrar
localStorage.removeItem("carrito");

/*
  Módulos
    => Archivo JS con el atributo type="module"
      -> Los módulos permiten compartir datos sin necesidad de estar incorporados al documento HTML
      -> import - traer al archivo actual datos/elementos de otro módulo
      -> export - hace disponible un elemento del documento actual 
        -> export - fuerza el import con el nombre del elemento. Puede haber varios export en un mismo archivo
        -> export default - NO fuerza el import con el mismo nombre. Sólo puede haber un export default por archivo
    => Sólo se pueden usar en navegadores que reconozcan ECMAScript 6    

  JS -> Lenguaje compilado just-in-time
    => El intérprete, lee un archivo js y lo ejecuta  
*/

const p = document.getElementById("unP");
p.innerHTML = "Texto agregado en JS";
//console.log("Algo");
//unaFn();

import { fnImportada, otraFn } from "./funciones.js";
import pepe from "./funciones.js";
fnImportada();
otraFn();
pepe();
