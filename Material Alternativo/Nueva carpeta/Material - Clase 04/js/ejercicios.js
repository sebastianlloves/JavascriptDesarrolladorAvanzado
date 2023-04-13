/*
  Crear un cuadrado dinámico que debe aparecer en la pantalla 1,5 segundos después de que se haya cargado el contenido del DOM. Debe usar los colores dentro del siguiente array para cambiar su background. Los colores deben mostrarse cada 1,5 segundos
  const colores = ["red", "yellow", "green"];
*/
const colores = ["red", "yellow", "green"];

const fondo = (i) => {
  const cuadrado = document.getElementById("colores");
  cuadrado.style.backgroundColor = colores[i];
};

const crearDiv = () => {
  const h2 = document.querySelector("section>h2");
  const div = document.createElement("div");
  div.style.width = "150px";
  div.style.height = "150px";
  div.style.border = "1px solid black";
  div.style.marginTop = "10px";
  div.setAttribute("id", "colores");
  h2.insertAdjacentElement("beforeend", div);
};

setTimeout(() => {
  crearDiv();
  setTimeout(() => {
    fondo(0);
  }, 1500);
  setTimeout(() => {
    fondo(1);
  }, 3000);
  setTimeout(() => {
    fondo(2);
  }, 4500);
}, 1500);

/*
  1. Generar un form que permita obtener nombre de usuario y contraseña
  2. Obtener información almacenada en el JSON bd.json usando AJAX
  3. Validar los datos obtenidos en el form contra los datos obtenidos mediante AJAX
  4. Mostrar si el usuario puede o no ingresar	 	
*/

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const h3 = document.querySelector("h3");
  const xhr = new XMLHttpRequest();

  xhr.open("get", "bd.txt");
  xhr.send();

  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      const res = xhr.response;
      res = JSON.parse(res);

      const dataForm = document.querySelectorAll("form input");
      const userEncontrado = false;

      for (const user of res) {
        if (
          user.user === dataForm[0].value &&
          user.pass === dataForm[1].value
        ) {
          location.href = `plantillasUsuarios/${user.role}.html`;
          userEncontrado = true;
          break;
        }
      }

      if (userEncontrado === false && document.querySelector("h3") === null) {
        let h3 = document.createElement("h3");
        h3.className = "mt-4 text-center text-danger";
        h3.innerHTML = "Login Incorrecto";

        document.querySelector("form").insertAdjacentElement("afterend", h3);
      }
    } else {
      h3.innerHTML = "No pudimos conectarte";
    }
  });
});
