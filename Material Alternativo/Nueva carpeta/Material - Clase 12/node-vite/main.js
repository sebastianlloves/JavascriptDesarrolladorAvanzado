/* 
Presentación ViteJS

import "./main.css";
import { home } from "./components/home";
import { setupCounter } from "./utils/counter";

//Inicializar
const $app = document.getElementById("app");
$app.innerHTML = home();

//Agregar funcionalidad del botón contador
const $btn = document.getElementById("counter");
setupCounter($btn); 

*/

import main from "./ejemplo/main.html?raw";
import "./ejemplo/main.css";
import router from "./ejemplo/components/router";
import logo from "/vite.svg";
import nav from "./ejemplo/nav.json";

//Creación del menu
let menu = "";
nav.links.forEach(
  (link) => (menu += `<a href='#${link.toLowerCase()}'>${link}</a>`)
);

//Inicializar
const $app = document.getElementById("app");
let html = main.replace("#menu", menu);
html = main.replace("logoVite", logo);
$app.innerHTML = html;

window.addEventListener("load", () => {
  router(location.hash);
  window.addEventListener("hashchange", () => {
    router(location.hash);
  });
});
