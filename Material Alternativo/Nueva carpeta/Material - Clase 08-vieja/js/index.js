console.log("\nCadena de Prototipos");
/*
  Cadena de Prototipos
  Object -> prototipoPersona
*/

const prototipoPersona = {
  contexto: "prototipoPersona",
  nombre: "",
  saludar() {
    console.log(`\nHola, mi nombre es: ${this.nombre}`);
    //Implicit Binding
    console.log("Contexto de ejecución función saludar", this);
  },
};

const persona1 = Object.create(prototipoPersona);
persona1.contexto = "Pepe";
persona1.nombre = "Pepe";
persona1.saludar();

/*
  Cadena de Prototipos
  Object -> prototipoPersona -> prototipoEmpleado
*/

const prototipoEmpleado = {
  contexto: "prototipoEmpleado",
  __proto__: prototipoPersona,
  puesto: "",
  decirPuesto() {
    console.log(`Soy ${this.puesto}`);
    //Implicit Binding
    console.log("Contexto de ejecución función decirPuesto", this);
  },
  contextoArrow: () => {
    //Se "salta" el contexto del Objeto que la contiene
    console.log("Contexto de ejecución función Arrow Function", this);
  },
};

const empleado1 = Object.create(prototipoEmpleado);
empleado1.contexto = "Ana";
empleado1.nombre = "Ana";
empleado1.puesto = "Programadora";
empleado1.saludar();
empleado1.decirPuesto();
empleado1.contextoArrow();

/*
  El Método Object.create(prototype) crea un nuevo Objeto con el prototype que le pasamos como argumento para agregarlo a la Cadena de Prototipos
*/

console.log("\nFunciones Constructoras");

/*
  Función Constructora de Cadena de Prototipos
  Object -> Persona
  
*/

function Persona(nombre, apellido) {
  //Atributos/Propiedades
  this.nombre = nombre;
  this.apellido = apellido;
}

//Métodos
Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
};

const pepe = new Persona("Pepito", "Pepo");
pepe.saludar(); //Hola, soy Pepe Peposo

/*
  Función Constructora de Cadena de Prototipos
  Object -> Persona -> Empleado
*/

function Empleado(nombre, apellido, puesto) {
  //Usamos las propiedades declaradas en Persona para crear las propiedades de Empleado
  Persona.call(this, nombre, apellido);
  this.puesto = puesto;
}

Empleado.prototype = new Persona();
Empleado.prototype.decirPuesto = function () {
  console.log(`Soy ${this.puesto}`);
  //Implicit Binding
  console.log("Contexto de ejecución función decirPuesto", this);
};

const empleado2 = new Empleado("Ana", "Clara", "Programadora");
empleado2.decirPuesto();

/*
  La Función Constructora nos permite crear un Prototype
  que será tomado por cada Objeto creado usando new 
*/
