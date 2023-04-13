/*
    API Web
        => Browser Object Model (BOM)
            -> Funcionalidades del Navegador
            -> Objeto window
        => Document Objecto Model (DOM)
            -> Funcionalidades del Documento HTML
            -> Objeto document


    Objeto documento
        => Objeto HTML
            -> Funcionalidades de los elementos del Documento HTML
            -> Tomar elementos existentes en el HTML
                -> document.getElementById(id)
                    -> Utiliza la información del elemento cuyo atributo id corresponda
                -> document.querySelector(selectorCSS)
                    -> Utiliza la información del PRIMER elemento que corresponda con el selector CSS pasado
                -> document.querySelectorAll(selectorCSS)       
                    -> Genera un array-like(node-list) que contiene todos los elementos que coincidan con el selector CSS pasado
            -> Crear objetos HTML sin utilizar datos de elementos existentes en Documento HTML (Elemento Dinámico)
                -> document.createElement(elemento)
            -> Crear fragmento para contener varios Objetos HTML
                -> document.createDocumentFragment()
*/

//const h3 = document.querySelector("#titulo");
const h3 = document.getElementById("titulo");
console.log(h3);
const h2s = document.querySelectorAll("h2");
console.log(h2s);

//Agregar contenido
//h3.textContent = "Manipulación del Elemento";
//h3.innerText = "<i>Manipulación del Elemento</i>";
h3.innerHTML = "<i>Manipulación del Elemento</i>";

//Modificar los estilos
//h3.className = "azul";
//h3.className = "subrayado";
//h3.className = "azul subrayado";
h3.classList.add("azul", "subrayado");
if (h3.classList.contains("subrayado")) {
  h3.classList.remove("subrayado");
}

//Crear elemento dinámico
const p = document.createElement("p");
p.classList.add("azul");
p.textContent = "Elemento dinámico";
p.setAttribute("id", "parrafo");

//Insertar
const ancla = document.querySelector(".app");

//Al final
ancla.appendChild(p); //Inserta elementos HTML
ancla.append("Texto insertado con HTML"); //Inserta elementos HTML o texto

//Al principio
ancla.prepend("Primer texto");

//insertAdjacentElement - ancla = referencia
const span = document.createElement("span");
span.textContent = "Otro elemento dinámico";
ancla.insertAdjacentElement("beforeend", span);

/*
    Regla de Oro de inserción de elementos dinámicos
        -> Modificar el DOM la menor cantidad de veces posible
*/
const fragment = document.createDocumentFragment();
const colores = ["Rojo", "Amarillo", "Verde"];

const contenedor = document.querySelector(".arr");

for (const color of colores) {
  const p = document.createElement("p");
  p.textContent = color;
  p.className = "parrafo";
  fragment.appendChild(p);
}

contenedor.appendChild(fragment);

/*
    Variables
*/

let algo = "un valor";
console.log(algo);
algo = "otra cosa";
console.log(algo);
