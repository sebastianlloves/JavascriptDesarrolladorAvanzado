import {
  cargarFormulario,
  cargarPaginaPersonalizada,
} from "./utils/crearVistas.js";
import { logIn } from "./utils/logIn.js";

const app = document.querySelector("#app");

//Inicio de Sesión
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("user")) {
    cargarPaginaPersonalizada();
  } else {
    cargarFormulario();

    //Manejo del submit
    app.addEventListener("submit", (e) => {
      e.preventDefault();

      //Mostrar loader
      const loader = document.getElementById("loader");
      loader.classList.remove("d-none");

      const userIngresado = document.querySelector("#user").value;
      //logIn
      logIn(userIngresado);
    });
  }
});

//Cierre de Sesión
app.addEventListener("click", (e) => {
  if (e.target.id === "salir") {
    localStorage.removeItem("user");
    cargarFormulario();
  }
});
