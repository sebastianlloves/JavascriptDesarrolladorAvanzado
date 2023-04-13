//Inicio de APP
const app = document.querySelector(".app");
//Array que uso para generar la vista
let arr = [];

function ajax(url, metodo, data) {
  const metodoHTTP = metodo || "GET";
  const xhr = new XMLHttpRequest();
  xhr.open(metodoHTTP, url);

  if (data) {
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }

  return xhr;
}

function render(arr) {
  /* arr.forEach((element) => {
    app.innerHTML += `<p>${element}</p>`;
  }); */

  app.innerHTML = arr
    .map(
      (el) => `<p>${el.userName}</p>
      <button style={margin-right: 5px} id="btnUpdate" data-id="${el.id}">Modificar</button>
      <button id="btnDelete" data-id="${el.id}">Borrar</button>`
    )
    .join("");
}

//const colores = ["Rojo", "Amarillo", "Verde"];
//render(colores);

const url = "https://62633b22c430dc560d2cf4d6.mockapi.io/users";

/*
  GET
*/

const users = ajax(url);

users.addEventListener("load", () => {
  if (users.status === 200) {
    //console.log(JSON.parse(posts.response));
    arr = JSON.parse(users.response);
    //console.log(arr);
    render(JSON.parse(users.response));
  } else {
    //Generar Objeto Error
    const err = new Error("No pudimos hacer la petición");
    err.status = users.status;
    err.statusText = users.statusText;
    console.log(err);
    console.log(`${err.status}: ${err.statusText}`);
  }
});

//console.log(arr); - Antes del listener del xhr.load === []

//Delegación de Evento Click
document.addEventListener("click", ({ target: { id, dataset } }) => {
  switch (id) {
    case "btnAdd": {
      const newUser = {
        ...arr[0],
        userName: "Pepe",
      };
      //console.log(newUser);

      const addUser = ajax(url, "POST", newUser);

      addUser.addEventListener("load", () => {
        //console.log(addUser.status, addUser.response);
        if (addUser.status === 201) {
          arr = [...arr, JSON.parse(addUser.response)];
          render(arr);
        } else {
          //Generar Objeto Error
          const err = new Error("No pudimos hacer la petición");
          err.status = users.status;
          err.statusText = users.statusText;
          console.log(err);
          console.log(`${err.status}: ${err.statusText}`);
        }
      });
      break;
    }

    case "btnUpdate": {
      //console.log(dataset.id);
      const idUser = dataset.id;
      const endpoint = `${url}/${idUser}`;
      //console.log(endpoint);

      const findUserModificar = arr.find((user) => user.id == idUser);

      const newUser = {
        ...findUserModificar,
        userName: "Pepa",
        role: "User",
      };

      const putUser = ajax(endpoint, "PUT", newUser);

      putUser.addEventListener("load", () => {
        //console.log(putUser.status);
        if (putUser.status === 200) {
          const userModificado = JSON.parse(putUser.response);
          arr = arr.map((user) =>
            user.id === userModificado.id
              ? { ...user, ...userModificado }
              : user
          );
          //console.log(arr);
          render(arr);
        } else {
          //Generar Objeto Error
          const err = new Error("No pudimos hacer la petición");
          err.status = users.status;
          err.statusText = users.statusText;
          console.log(err);
          console.log(`${err.status}: ${err.statusText}`);
        }
      });
      break;
    }

    case "btnDelete": {
      const idUser = dataset.id;
      const endpoint = `${url}/${idUser}`;

      const deleteUser = ajax(endpoint, "DELETE");

      deleteUser.addEventListener("load", () => {
        if (deleteUser.status === 200) {
          const userEliminado = JSON.parse(deleteUser.response);

          arr = arr.filter((user) => user.id !== userEliminado.id);

          render(arr);
        } else {
          //Generar Objeto Error
          const err = new Error("No pudimos hacer la petición");
          err.status = users.status;
          err.statusText = users.statusText;
          console.log(err);
          console.log(`${err.status}: ${err.statusText}`);
        }
      });
      break;
    }
  }
});

/*
  Single Page Application (SPA) -> Sitios web que tienen un único archivo HTML

  Single Page Web -> Sitio web que se arma escribiendo todo el HTML en un único

  API Web -> location 
    => Contiene toda la información sobre la ruta actual
    => Generar rutas con location no requiere fallback de servidor

  API Web -> history
    => Manipular el historial de navegación
    => Generar rutas con history requiere fallback de servidor

  fallback de servidor
    => Configuración necesaria para que, al momento de recibir el historial de navegación, sea capaz reconocer la ruta  

*/

/*
  API Web Location
*/

//Elemento del HTML
const rootLocation = document.getElementById("rootLocation");

const renderPage = (url, root) => {
  const html = ajax(url);

  html.addEventListener("load", () => {
    if (html.status === 200) {
      root.innerHTML = html.response;
    } else {
      //Generar Objeto Error
      const err = new Error("No pudimos hacer la petición");
      err.status = users.status;
      err.statusText = users.statusText;
      console.log(err);
      console.log(`${err.status}: ${err.statusText}`);
    }
  });
};

//Inicio de App
renderPage("pages/home.html", rootLocation);
//location.hash = "home";
//console.log(location);

//Manejar rutas con location (cambiar ruta)
rootLocation.addEventListener("click", (e) => {
  e.preventDefault();
  const {
    target: { id },
  } = e;

  if (id === "home" || id === "contacto") location.hash = id;
});

//Escucha del evento de cambio ruta (hashchange)
window.addEventListener("hashchange", () => {
  //console.log(location.hash);
  //console.log(location.hash.slice(1, location.hash.length));
  const path = `${location.hash.slice(1, location.hash.length)}.html`;
  //console.log(path);
  renderPage(`pages/${path}`, rootLocation);
});

window.addEventListener("DOMContentLoaded", () => {
  const path = `${location.hash.slice(1, location.hash.length)}.html`;
  renderPage(`pages/${path}`, rootLocation);
});

/*
  API Web History
*/

//Elemento HTML
const rootHistory = document.getElementById("rootHistory");

//Inicio de App
renderPage(`pages/home.html`, rootHistory);

rootHistory.addEventListener("click", (e) => {
  e.preventDefault();
  const {
    target: { id },
  } = e;

  if (id === "home" || id === "contacto") {
    const path = `${id}.html`;
    //console.log(path);

    const html = ajax(`pages/${path}`);

    html.addEventListener("load", () => {
      if (html.status === 200) {
        rootHistory.innerHTML = html.response;

        //Generar el historial ficticio de navegación
        const templateVista = { template: html.response };
        const pathName = id;
        history.pushState(templateVista, "", pathName);
      } else {
        //Generar Objeto Error
        const err = new Error("No pudimos hacer la petición");
        err.status = users.status;
        err.statusText = users.statusText;
        console.log(err);
        console.log(`${err.status}: ${err.statusText}`);
      }
    });
  }
});
