/*
  Crear funciones que usen los valores de un array para retornar los valores modificados.
    => Las funciones NO DEBEN recibir el array como argumento
    => Debe ser posible utilizarlas para leer un array almacenado dentro de un objeto
    => Deben recibir una función callback para indicar cómo se deben modificar los valores originales
    => Acciones a ejecutarse
      => Alterar los valores almacenados
      => Filtrar el valor especificado
      => Encontrar el valor especificado. Debe retornar el valor encontrado no un array (puede no recibir una función callback)
    => Los valores devueltos deben quedar almacenados en el objeto que contiene el array original. 
    => Mostrar los resultados en pantalla  
*/

//Funciones a pensadas para aprovechar el call-site
function modificar(cb) {
  for (const item of this.arr) {
    this.modificado.push(cb(item));
  }
}

function filtrar(condicion) {
  for (const item of this.arr) {
    if (condicion(item)) this.filtrado.push(item);
  }
}

function encontrar(itemBuscar) {
  for (const item of this.arr) {
    if (item === itemBuscar) this.encontrado = item;
  }
}

//Objetos que almacenan las funciones que aprovechan call-site
const unObjeto = {
  arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  modificado: [],
  filtrado: [],
  encontrado: [],
  modificar: modificar,
  filtrar: filtrar,
  encontrar: encontrar,
};

const otroObjeto = {
  arr: ["Juan", "María", "Pedro"],
  modificado: [],
  filtrado: [],
  encontrado: [],
  modificar,
  filtrar,
  encontrar,
};

//Ejecución
unObjeto.modificar((item) => item * 2);
unObjeto.filtrar((item) => item <= 5);
unObjeto.encontrar(7);

otroObjeto.modificar((nombre) => `Hola soy ${nombre}`);
otroObjeto.filtrar((nombre) => nombre !== "Juan");
otroObjeto.encontrar("María");

//Mostrar en pantalla
const contenedorResultados = document.getElementById("resultados");
const fragment = document.createDocumentFragment();

const crearVista = (texto, arr) => {
  const titulo = document.createElement("h3");
  titulo.classList.add("fs-3", "text-capitalize", "fw-bolder");
  titulo.textContent = texto;
  fragment.appendChild(titulo);
  if (typeof arr === "object") {
    const p = document.createElement("p");
    p.classList.add("fs-4");
    for (const resultado of arr) {
      p.textContent += `${resultado}, `;
    }
    fragment.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.classList.add("fs-4");
    p.textContent = arr;
    fragment.appendChild(p);
  }
};

//Modificar
crearVista("Resultado de modificar unObjeto.arr", unObjeto.modificado);
crearVista("Resultado de modificar otroObjeto.arr", otroObjeto.modificado);

//Filtrar
crearVista("Resultado de filtrar unObjeto.arr", unObjeto.filtrado);
crearVista("Resultado de filtrar otroObjeto.arr", otroObjeto.filtrado);

//Encontrar
crearVista("Resultado de encontrar unObjeto.arr", unObjeto.encontrado);
crearVista("Resultado de encontrar otroObjeto.arr", otroObjeto.encontrado);

contenedorResultados.appendChild(fragment);

/*
  Crear un Prototipo Usuario con las propiedades id, user, pass y mail y el método setUser que maneje el cambio de las propiedades. 
  El valor de la propiedad id no puede repetirse.
    => Crear algunos objetos Usuario y almacenarlos en un array. 
    => Crear una tabla dinámica para mostrar los distintos usuarios. Agregar un botón que permita modificar las propiedades de cada usuario en particular. No se debe permitir la modificación de la propiedad id.
*/

//Prototipo Usuario
function Usuario(user, pass, mail) {
  this.id = Date.now();
  this.user = user;
  this.pass = pass;
  this.mail = mail;
}

//Métodos de usuario
Usuario.prototype.setUser = function (user, pass, mail) {
  this.user = user;
  this.pass = pass;
  this.mail = mail;
};

//Elementos de tabla
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

//Elementos del formulario
const form = document.querySelector("form");
const idForm = document.getElementById("idNumber");
const nombreForm = document.getElementById("nombre");
const passForm = document.getElementById("pass");
const mailForm = document.getElementById("mail");

//Creación y almacenamiento de usuarios
let arrUsers = [];
const pepe = new Usuario("Pepe", 1234, "pepe@gmail.com");
arrUsers.push(pepe);

//Modificar Usuario
const modificarUser = (id) => {
  //Cambiar valores
  const user = arrUsers.find((user) => user.id === id);
  user.user = nombreForm.value;
  user.pass = passForm.value;
  user.mail = mailForm.value;

  //Modificar array
  for (let index = 0; index < arrUsers.length; index++) {
    const element = arrUsers[index];
    if (element.id === id) {
      arrUsers[index] = user;
      break;
    }
  }

  //Limpiar y Ocultar Formulario
  idForm.value = "";
  nombreForm.value = "";
  passForm.value = "";
  mailForm.value = "";
  form.classList.add("oculto");

  //Volver a renderizar filas
  tbody.innerHTML = "";
  renderizarFilas();

  console.log(arrUsers);
};

//Tabla dinámica
function renderizarTabla() {
  let user;
  if (arrUsers.length > 0) user = arrUsers[0];
  else return;

  //Crear thead
  const tr = document.createElement("tr");
  for (const key in user) {
    if (key === "setUser") break;
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  //Crear tbody
  renderizarFilas();
}

function renderizarFilas() {
  arrUsers.forEach((user) => {
    const tr = document.createElement("tr");
    for (const key in user) {
      if (key === "setUser") break;
      const td = document.createElement("td");
      td.textContent = user[key];
      tr.appendChild(td);
    }
    const btn = document.createElement("button");
    btn.id = `${user.user}`;
    btn.innerHTML = "Modificar";
    tr.appendChild(btn);
    tr.id = user.id;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

//Listener del boton
document.querySelector("#usuarios").addEventListener("click", (e) => {
  let user = e.target.id;

  for (const usuario of arrUsers) {
    if (usuario.user === user) {
      user = usuario;
      break;
    }
  }

  //Completar con datos de usuario
  form.classList.remove("oculto");
  idForm.value = user.id;
  nombreForm.value = user.user;
  passForm.value = user.pass;
  mailForm.value = user.mail;
});

//Submit del formulario
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  modificarUser(Number(idForm.value));
});

//Renderizar tabla cuando carga el HTML
window.addEventListener("DOMContentLoaded", renderizarTabla);
