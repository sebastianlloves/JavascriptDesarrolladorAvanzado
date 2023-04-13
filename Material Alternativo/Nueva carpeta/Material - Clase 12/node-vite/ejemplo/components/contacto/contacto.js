import contacto from "./contacto.html?raw";
import "./contacto.css";

function submitHandler(e) {
  e.preventDefault();

  //Elementos del DOM
  const comentarios = document.querySelector(".comentarios");
  const nombreInput = document.getElementById("usuario");
  const comentarioInput = document.getElementById("comentario");

  //Crear comentario
  const comentario = document.createElement("div");
  comentario.className = "comentario";
  comentario.innerHTML = `
    <h3 class="user">${nombreInput.value} dijo:</h3>
    <p class="texto">${comentarioInput.value}</p>`;

  //Insertar comentario
  comentarios.appendChild(comentario);

  //Limpiar formulario
  nombreInput.value = "";
  comentarioInput.value = "";
}

export default () => {
  document.addEventListener("submit", submitHandler);

  return contacto;
};
