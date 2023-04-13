/* 
  Armar una Clase Empleado que tenga las propiedades id, nombre y puesto con sus respectivos getters y setters. 
  Crear un CRUD usando un Array
  Create => Debe crear una instancia de la Clase Empleado y guardarlo en el array. Cada nuevo empleado debe tener un id único
  Read => Debe imprimir en pantalla una tabla con los elementos almacenados en el array
  Update => Debe modificar las propiedades del empleado correspondiente y actualizar la vista
  Delete => Debe eliminar al empleado del array y actualizar la vista   
*/

//Elementos del HTML
const form = document.querySelector("form");
const table = document.querySelector("table");

class Empleado {
  constructor(nombre, puesto) {
    //this.id = Date.now(); - Generar id aleatorio con hora
    this.id = null;
    this.nombre = nombre;
    this.puesto = puesto;
  }

  set setID(id) {
    this.id = id;
  }

  get getNombre() {
    return this.nombre;
  }

  set setNombre(nombre) {
    this.nombre = nombre;
  }

  get getPuesto() {
    return this.puesto;
  }

  set setPuesto(puesto) {
    this.puesto = puesto;
  }
}

let empleados = [];
//Creación Manual
const pepe = new Empleado("Pepe", "Diseñador UX/UI");
pepe.setID = `${pepe.nombre}-${empleados.length}`;
empleados.push(pepe);
const pepa = new Empleado("Pepa", "Programadora Front-end");
pepa.setID = `${pepa.nombre}-${empleados.length}`;
empleados.push(pepa);
//console.log(empleados);

//Función creadora de empleado
function crearEmpleado(nombre, puesto) {
  const empleado = new Empleado(nombre, puesto);
  empleado.setID = `${empleado.nombre}-${empleados.length}`;
  empleados.push(empleado);
  table.innerHTML = "";
  crearTabla();
}

//Eliminar empleado del array
function borrar(id) {
  empleados = empleados.filter((empleado) => empleado.id !== id);
  table.innerHTML = "";
  crearTabla();
}

//Crear datos para modificación
table.addEventListener("click", (e) => {
  const el = e.target;
  const id = el.dataset.id;
  const empleado = empleados.find((empleado) => empleado.id === id);
  //console.log(empleado);

  switch (el.dataset.btn) {
    case "btnM":
      //Imprimir datos en formulario
      const id = form.elements[0];
      const nombre = form.elements[1];
      const puesto = form.elements[2];
      const btn = form.elements[3];

      id.value = empleado.id;
      nombre.value = empleado.nombre;
      puesto.value = empleado.puesto;
      btn.value = "Modificar";
      break;
    case "btnE":
      const eliminar = confirm(`Eliminar empleado con id: ${empleado.id}`);
      if (eliminar) borrar(empleado.id);
      break;
  }
});

//Modificar empleado en array
function modificar(id) {
  const empleado = empleados.find((empleado) => empleado.id === id);
  //console.log(empleado);
  empleado.setNombre = "Pepito";
  empleados = borrar(empleado.id);
  empleados.push(empleado);
  table.innerHTML = "";
  crearTabla();
}

//Manejo de submit del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = form.elements[0];
  const nombre = form.elements[1];
  const puesto = form.elements[2];
  const btn = form.elements[3];
  if (btn.value === "Agregar") crearEmpleado(nombre.value, puesto.value);
  else modificar(id.value);
  //Limpiar Formulario
  id.value = "";
  nombre.value = "";
  puesto.value = "";
  btn.value = "Agregar";
  //console.log(empleados);
});

//Renderizar Tabla
function crearEncabezados(arr) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in arr[0]) {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    tr.appendChild(th);
    thead.appendChild(tr);
  }
  table.appendChild(thead);
}

function crearFilas(arr) {
  const tbody = document.createElement("tbody");
  arr.forEach((el) => {
    const tr = document.createElement("tr");
    for (const key in el) {
      const td = document.createElement("td");
      td.textContent = el[key];
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    //Botón modificar
    const btn = document.createElement("button");
    btn.id = `modificar${el.id}`;
    btn.innerHTML = "Modificar";
    btn.dataset.btn = "btnM";
    btn.dataset.id = el.id;
    tr.appendChild(btn);
    //Botón eliminar
    const btn1 = document.createElement("button");
    btn1.id = `eliminar${el.id}`;
    btn1.innerHTML = "Eliminar";
    btn1.classList.add("eliminar");
    btn1.dataset.btn = "btnE";
    btn1.dataset.id = el.id;
    tr.appendChild(btn1);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function crearTabla() {
  crearEncabezados(empleados);
  crearFilas(empleados);
}

window.addEventListener("DOMContentLoaded", crearTabla);
