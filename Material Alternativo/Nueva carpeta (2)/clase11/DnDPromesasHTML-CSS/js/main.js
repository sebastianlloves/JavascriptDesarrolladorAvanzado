import randomID from "./utils/getRandom.js";
import { asyncFetch } from "./utils/asyncFetch.js";

const CANTIDAD_POKEMNOS = 10;

//Elementos del DOM
const loader = document.querySelector(".loader");
const draggableElements = document.querySelector(".draggable-elements");
const droppableElements = document.querySelector(".droppable-elements");
const error = document.querySelector(".wrong");

//Valores de state
let pokemonNames = [];
const ids = [];

(async () => {
  //Obtener ids para petición
  for (let i = 1; i <= CANTIDAD_POKEMNOS; i++) {
    let id = randomID(150);
    const existe = ids.find((el) => el === id);
    if (existe) id = randomID(150);
    ids.push(id);
  }

  //Armar la vista de Pokemons
  const fragmentDraggable = document.createDocumentFragment();

  for (let i = 0; i < CANTIDAD_POKEMNOS; i++) {
    const id = ids[i];
    const pokemon = await asyncFetch(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    ).catch((err) => console.log(err));

    //Imágenes
    const div = document.createElement("div");
    div.classList.add("pokemon");

    const img = document.createElement("img");
    img.id = pokemon.name;
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.alt = pokemon.name;
    img.className = "image";

    div.appendChild(img);
    fragmentDraggable.appendChild(div);

    //Agregar el nombre a la lista
    pokemonNames.push(pokemon.name);
  }

  //Ya existen los pokemon;
  loader.classList.add("none");
  draggableElements.appendChild(fragmentDraggable);

  //Armar la vista de los DropZone
  pokemonNames = pokemonNames.sort();

  const fragmentDroppable = document.createDocumentFragment();

  pokemonNames.forEach((name) => {
    const div = document.createElement("div");
    div.className = "names";

    const p = document.createElement("p");
    p.textContent = name;

    div.appendChild(p);
    fragmentDroppable.appendChild(div);
  });

  droppableElements.appendChild(fragmentDroppable);

  //Conteo de puntos
  let points = 0;

  draggableElements.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("name", e.target.id);
  });

  droppableElements.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  droppableElements.addEventListener("drop", (e) => {
    e.preventDefault();
    const pokemon = e.dataTransfer.getData("name");
    const pokemonElement = document.getElementById(pokemon);
    const name = e.target.innerText;

    if (pokemon === name) {
      error.textContent = "";
      e.target.innerHTML = "";
      e.target.appendChild(pokemonElement);
      points++;
      if (points === CANTIDAD_POKEMNOS)
        draggableElements.innerHTML = "<p class='win'>Congrats!</p>";
    } else {
      error.textContent = "Ups!";
    }
  });
})();

/* function start(){

}

start(); */
