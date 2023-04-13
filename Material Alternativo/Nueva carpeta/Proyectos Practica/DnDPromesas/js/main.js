import { asyncFetch } from "./utils/asyncFetch.js";
import { getRandomId } from "./utils/getRandomId.js";

const CANTIDAD_POKEMONS = 10;

//Elementos del DOM
const loader = document.querySelector(".loader");
const draggableElements = document.querySelector(".draggable-elements");
const droppableElements = document.querySelector(".droppable-elements");
const error = document.querySelector(".wrong");

let pokemonNames = [];
const ids = [];

(async () => {
  for (let i = 1; i <= CANTIDAD_POKEMONS; i++) {
    let id = getRandomId(150);
    const existe = ids.find((el) => el === id);
    if (existe) {
      id = getRandomId(150);
    }
    ids.push(id);
  }

  const fragmentDraggable = document.createDocumentFragment();

  for (let i = 0; i < CANTIDAD_POKEMONS; i++) {
    const id = ids[i];
    const pokemon = await asyncFetch(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    ).catch((err) => console.log(err));

    //Crear Vista Imágenes
    const div = document.createElement("div");
    div.classList.add("pokemon");

    const img = document.createElement("img");
    img.id = pokemon.name;
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.alt = pokemon.name;
    img.className = "image";
    div.appendChild(img);
    fragmentDraggable.appendChild(div);

    pokemonNames.push(pokemon.name);

    /*  try {
      const id = ids[i];
      const pokemon = await asyncFetch(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      )

      /* if (pokemon instanceof Error) {
        throw pokemon;
      } 

      //Crear Vista Imágenes
      const div = document.createElement("div");
      div.classList.add("pokemon");

      const img = document.createElement("img");
      img.id = pokemon.name;
      img.src = pokemon.sprites.other["official-artwork"].front_default;
      img.alt = pokemon.name;
      img.className = "image";
      div.appendChild(img);
      fragmentDraggable.appendChild(div);

      pokemonNames.push(pokemon.name);
    } catch (error) {
      console.log(error);
    } */
  }

  loader.classList.add("none");
  draggableElements.appendChild(fragmentDraggable);

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

  let points = 0;

  //Arrastrar
  draggableElements.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("name", event.target.id);
  });

  //Soltar
  droppableElements.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  droppableElements.addEventListener("drop", (event) => {
    event.preventDefault();
    const pokemon = event.dataTransfer.getData("name");
    const pokemonElement = document.getElementById(pokemon);
    const name = event.target.innerText;

    if (pokemon === name) {
      error.textContent = "";
      event.target.innerHTML = "";
      event.target.appendChild(pokemonElement);
      points++;
      if (points === CANTIDAD_POKEMONS)
        draggableElements.innerHTML = "<p class='win'>Congrats!</p>";
    } else {
      error.textContent = "Ups!";
    }
  });
})();
