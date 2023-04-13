import { asyncFetch } from "./asyncFetch.js";

const userPage = "pages/paginaUser.html";
const form = "pages/form.html";

export const cargarPaginaPersonalizada = async () => {
  //Crear Página Personalizada
  try {
    const texto = await asyncFetch(userPage);
    const arr = texto.split("\n");
    const user = localStorage.getItem("user");

    arr.splice(4, 0, `<h2 class="fs-1">Bienvenid@ ${user}</h2>`);

    const html = arr.join("\n");

    //Insertar Página
    app.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

export const cargarFormulario = async () => {
  try {
    const html = await asyncFetch(form);
    app.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};
