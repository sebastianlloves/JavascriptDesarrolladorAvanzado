import { asyncFetch } from "./asyncFetch.js";
import { cargarPaginaPersonalizada } from "./crearVistas.js";

const url = "https://jsonplaceholder.typicode.com/users";

export async function logIn(userIngresado) {
  try {
    const users = await asyncFetch(url);

    const user = users.find((usuario) => usuario.name === userIngresado);
    if (user) {
      const name = user.name;
      localStorage.setItem("user", name);

      //Ocultar loader
      loader.classList.add("d-none");

      cargarPaginaPersonalizada();
    } else {
      //Ocultar loader
      loader.classList.add("d-none");

      //Mostrar error
      const span = document.getElementById("error");
      span.classList.remove("d-none");
      setTimeout(() => {
        span.classList.add("d-none");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}
