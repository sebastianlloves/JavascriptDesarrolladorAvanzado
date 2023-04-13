/*
  Sincronización de datos
*/

let state = [];

function mostrarDatos(state) {
  state.forEach((element) => {
    console.log(element);
  });
}

//Get
function ajaxGet(res) {
  return res;
}

state = ajaxGet(["dato 1", "dato 2", "dato 3"]);

console.log("GET");
mostrarDatos(state);

//Post
function ajaxPost(dato) {
  const nuevosDatos = [...state, dato];
  return nuevosDatos;
}

state = ajaxPost("dato 4");
//state = {};

console.log(" ");
console.log("POST");
mostrarDatos(state);

//console.log(window);

/*
  Programación Reactiva
      => Paradigma de Programación Funcional
          -> Principio de Inmutabilidad
          -> Funciones Puras
      => Patrón Iterable
          -> Protege los valores de trabajo
      => Patrón Observer
          -> Objeto Observable 
              -> Almacena el estado actual de la aplicación
              -> Avisa los cambios de estado
          -> Objeto Observador
              -> Escucha el aviso y genera una reacción
*/

/*
  Patron Observador
*/

function cambiarState(nuevoNombre) {
  this.state = {
    ...this.state,
    nombre: nuevoNombre,
  };
  this.notificar();
}

function crearObservable() {
  return {
    state: {
      nombre: "",
    },
    suscriptores: [],
    agregarSuscriptores: function (observador) {
      //this === Espacio de memoria actual
      this.suscriptores.push(observador);
    },
    notificar: function () {
      this.suscriptores.forEach((observador) => {
        observador.notificado(this.state);
      });
    },
    cambiarState,
  };
}

function crearObservador(reaccionar) {
  return {
    notificado: reaccionar,
  };
}

/* function agregarSuscriptor(observable, observador) {
  observable.suscriptores.push(observador);
} */

//crearObservable -> Se guarda en Objeto window || retorna un nuevo Objeto (espacio de memoria)
const observable = crearObservable();

//observable.agregarSuscriptores("un observador");
//agregarSuscriptor(observable, "un observador");
//observable.cambiarState("Pepe");
//console.log("observable", observable);

//const observable1 = crearObservable();
//observable1.cambiarState("Pepa");
//console.log("observable1", observable1);

const observador1 = crearObservador((state) =>
  console.log(`Hola, mi nombre es ${state.nombre}`)
);

const observador2 = crearObservador((state) => {
  const p = document.getElementById("nombreObservador2");
  p.textContent = `Hola, mi nombre es ${state.nombre}`;
});

//Agregar los observadores al observable
observable.agregarSuscriptores(observador1);
observable.agregarSuscriptores(observador2);
observable.cambiarState("Pepe");
observable.cambiarState("Pepa");
//console.log(observable);
//console.log(observable.hasOwnProperty("hasOwnProperty"));

/*
  Programación Reactiva
    => Usando la API: https://62633b22c430dc560d2cf4d6.mockapi.io/users
      -> Generar una aplicación que muestre una lista de los nombres de usuario que obtenemos y permita agregar un nuevo nombre de usuario (no es necesario modificar la API).
      -> Los nombres de usuario obtenidos deben almacenarse en un array (state) dentro de un Observable
      -> Para agregar un nuevo nombre de usuario debemos modificar el array (state) creado anteriormente.
      -> Los nuevos nombres de usuario deben agregarse como consecuencia del click de un botón
      -> La vista debe actualizarse cada vez que se modifica el contenido del array (state) -Observador-
*/

//Elementos del HTML
const app = document.getElementById("reactiva");

//Función para realizar la petición AJAX
async function asyncFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const err = new Error("Error en la petición fetch");
      err.status = res.status;
      err.statusText = res.statusText;
      throw err;
    }

    const data = await res.json(); //Convierte el Objeto JSON en dato JS válido

    return data;
  } catch (error) {
    console.log(`Error - status: ${error.status} - ${error.statusText}`);
  }
}

/* 
  let unaVar; //unaVar === undefined (línea 140)
  unaVar = "algo";//unVar === "algo" (línea 141)
  function datoAsync(){
    setTimeout(() => {
      return "otra cosa";
    })
  }
  unaVar = datoAsync();//unVar === "otra cosa" (línea 149)
  unaVar = "algo más";//unVar === "algo más" (línea 148) 
*/

//Función para modificar el state (inmutabilidad - programación funcional)
function setState(newState) {
  const state = this.state;

  for (const key in newState) {
    if (state.hasOwnProperty(key)) {
      state[key] = newState[key];
    }
  }

  return state;
}

/* const oldState = {
  clave1: "algo",
  calve2: "otra cosa",
};

const newState = {
  clave1: "algo nuevo",
  clave2: "un valor",
  clave3: "algo más",
}; */

//Función para generar el iterable
function createIterator(array) {
  this.arr = array;
  this.index = 0;

  return {
    first: () => this.arr[0],
    next: () => {
      this.index++;
      return this.arr[this.index];
    },
    current: () => this.arr[index],
    last: () => this.arr[this.arr.length - 1],
  };
}

//Función para inicializar state
async function start(url) {
  const users = await asyncFetch(url);
  const newState = {
    users: users,
  };
  this.state = this.setState(newState);
  this.iterador = this.createIterator(users);
  this.notify(this.state);
}

//Función para agregar usuario al state
function addUser(data) {
  const newState = {
    users: [...this.state.users, data],
  };
  this.state = this.setState(newState);
  this.iterador = this.createIterator(newState.users);
  this.notify(this.state);
}

//Crear Observable
function UsersObservable() {
  return {
    state: {
      users: [],
    },
    iterador: {},
    subscribers: [],
    suscribe: function (subscriber) {
      this.subscribers.push(subscriber);
    },
    notify: function (state) {
      this.subscribers.forEach((subscriber) => {
        subscriber.notify(state);
      });
    },
    start,
    setState,
    addUser,
    createIterator,
  };
}

//Crear Observador
function UsersObservador(react) {
  return {
    notify: react,
  };
}

//Funciones de Manipulación de Vistas

function listView(arr) {
  const listItems = arr.map((el) => `<li>${el.userName}</li>`).join("");
  const list = `<ul>${listItems}</ul>`;
  return list;
}

function formView() {
  return `
  <form id="addUser">
    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" id="nombre">
    <br><br>
    <input type="submit" value="Agregar">
  </form>
  `;
}

function render(arr) {
  let html = listView(arr);
  html += formView();
  app.innerHTML = html;
}

//Crear el Observador
const viewInput = UsersObservador((state) => {
  const { users } = state;
  render(users);
});

//Crear el state con el Observable
const usersState = UsersObservable();
usersState.suscribe(viewInput);

//Inicializar
const url = "https://62633b22c430dc560d2cf4d6.mockapi.io/users";
usersState.start(url);

//Delegación de Eventos
app.addEventListener("submit", (e) => {
  e.preventDefault();

  /* const {
    target: { elements },
  } = e;

  console.log(elements.nombre); */

  const inputNombre = e.target.elements.nombre;
  const nombre = inputNombre.value;
  //console.log(inputNombre);
  const lastUserID = usersState.iterador.last().id;
  const newUser = {
    userName: nombre,
    pass: Date.now().toString(),
    role: "user",
    id: Number(lastUserID) + 1,
  };
  usersState.addUser(newUser);
});
