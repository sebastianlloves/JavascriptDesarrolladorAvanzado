/*
  Patrón Observador
*/
function crearObservable() {
  return {
    estado: "",
    suscriptores: [],
    agregarSuscriptor: function (suscriptor) {
      this.suscriptores.push(suscriptor);
    },
    notificar: function () {
      this.suscriptores.forEach((suscriptor) => {
        suscriptor.notificado(this.estado);
      });
    },
    cambiarEstado,
  };
}

function cambiarEstado(nuevoEstado) {
  this.estado = nuevoEstado;
  this.notificar();
}

function observador(reaccionar) {
  return {
    notificado: reaccionar,
  };
}

const observable = crearObservable();
observable.agregarSuscriptor(observador((aviso) => console.log(aviso)));
observable.agregarSuscriptor(
  observador((aviso) => console.log(`Recibí esto: ${aviso}`))
);
observable.cambiarEstado("nuevo estado");
observable.cambiarEstado("otro");

/*
  Patrón Iterador
*/

function crearIterable(array) {
  this.arr = array;
  this.index = 0;
  this.first = () => this.arr[0];
  this.next = () => {
    this.index += 1;
    return {
      value: this.arr[this.index],
      done: this.hasNext(),
    };
  };
  this.current = () => this.arr[index];
  //Opcionales
  this.hasNext = () => this.index + 1 < this.arr.length;
  this.reset = () => {
    this.index = 0;
  };
  //Aplicado según necesidad
  this.back = () => {
    this.index -= 1;
  };
  return {
    first,
    next,
    back,
    current,
    hasNext,
    reset,
  };
}

const iterable = crearIterable(["dato 1", "dato 2", "dato 3"]);
console.log(iterable);
console.log(iterable.first());
console.log(iterable.next());
console.log(iterable.current());
console.log(iterable.hasNext());
iterable.reset();
console.log(iterable.current());

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
const app = document.querySelector("#reactiva");

//Función para realizar la petición AJAX
async function asyncFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const err = new Error("Error en la comunicación");
      err.status = res.status;
      err.statusText = res.statusText;
      throw err;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`status: ${error.status} - ${error.statusText}`);
  }
}

//Función para modificar el valor de state del Observable respetando la inmutabilidad del objeto (programación funcional)
function setState(newState) {
  const state = this.state;
  for (const key in newState) {
    if (state.hasOwnProperty(key)) {
      state[key] = newState[key];
    }
  }
  return state;
}

//Función para crear el iterador del array que debe almacenar el state del Observable (patrón iterador)
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

//Función para inicializar el Observable cuando se carga la página por primera vez
async function start(url) {
  const users = await asyncFetch(url);
  const newState = {
    users: users,
  };
  this.state = this.setState(newState);
  this.iterator = this.createIterator(users);
  this.notify(this.state);
}

//Función para agregar un nuevo usuario al state del Observable. Mantiene el iterador actualizado
function addUser(data) {
  const newState = {
    users: [...this.state.users, data],
  };
  this.state = this.setState(newState);
  this.iterator = this.createIterator(newState.users);
  this.notify(this.state);
}

function Observable() {
  return {
    state: {
      users: [],
    },
    iterator: {},
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

//Función para crear el Observador
function Observador(react) {
  return {
    notify: react,
  };
}

//Funciones de manipulación de vista
function render(arr) {
  let html = list(arr);
  html += form();
  app.innerHTML = html;
}

function list(arr) {
  const listItems = arr.map((el) => `<li>${el.userName}</li>`).join("");
  const list = `<ul>${listItems}</ul>`;
  return list;
}

function form() {
  return `
  <form id="addUser">
    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" id="nombre">
    <br><br>
    <input type="submit" value="Agregar">
  </form>
  `;
}

//Crear Observador de manipulación de vista
const viewInput = Observador((state) => {
  const { users } = state;
  render(users);
});

//Ejecutar Observable y subscribir Observador
const state = Observable();
state.suscribe(viewInput);

//Inicializar
const endpoint = "https://62633b22c430dc560d2cf4d6.mockapi.io/users";
state.start(endpoint);

//Delegación de Eventos para agregar nuevos usuarios
app.addEventListener("submit", (e) => {
  e.preventDefault();
  //const { target } = e;
  //const { elements } = target;
  //const inputNombre = elements.nombre;
  const inputNombre = e.target.elements.nombre;
  const nombre = inputNombre.value;
  const lastUserID = state.iterator.last().id;
  const newUser = {
    userName: nombre,
    pass: Date.now().toString(),
    role: "user",
    id: Number(lastUserID) + 1,
  };
  state.addUser(newUser);
});

