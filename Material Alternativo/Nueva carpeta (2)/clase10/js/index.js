/*
  Repaso this clases anteriores
*/
(() => {
  function saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }

  const obj = {
    nombre: "Pepe",
    saludar,
  };

  const obj1 = {
    nombre: "Pepa",
    saludar,
  };

  obj.saludar(); //Contexto de Ejecución => obj
  obj1.saludar(); //Contexto de Ejecución => obj1
})();

/*
  call-site
    -> ¿Dónde es ejecutada una función?

  call-stack (Pila de Ejecución)
    -> Orden en que se ejecutan las funciones
*/

function fn1() {
  console.log("fn1");
  fn2(); //call-site -> fn1
}

function fn2() {
  console.log("fn2");
  fn3(); //call-site -> fn2
}

function fn3() {
  console.log("fn3");
}

fn1(); //call-site -> global

/*
  Contexto de Ejecución -> Reglas del this
    => Siguen un orden jerárquico
      -> 1. Default binding
      -> 2. Implicit binding
        -> Implicit Binding Lost
      -> 3. Explicit binding
        -> Hard Binding - Utiliza el Explicit Binding para evitar el Implicit Binding Lost
      -> 4. new binding
      -> Lexical binding (ECMAScript 2015) - sólo para las Arrow Function
        -> this es igual al espacio de memoria que contiene al elemento que ejecuta la función
*/

//Default binding - Toda función almacena una referencia al Objeto window (global)

function fnDefault() {
  console.log(this);
}

fnDefault();

//Implicit binding - Toda función almacena una referencia al Objeto que la contiene

function fnImplicit() {
  console.log(this);
}

//Objeto contextoImplicit contiene a fnImplicit
const contextoImplicit = {
  contexto: "Objeto contextoImplicit",
  fnImplicit, //this => contextoImplicit
};

contextoImplicit.fnImplicit();

//Implicit Binding Lost - Las Funciones Callback tiene el this de las funciones que las llaman
(function () {
  this.contexto = "Auto-invocada"; //En este Entorno Léxico, genera una clave contexto: "Auto-invocada"

  function fnImplicit(cb) {
    //console.log(this.contexto);

    cb();
    //Las referencias almacenadas dentro de los parámetros que nos permiten trabajar con funciones callback NO EJECUTAN, simplemente indican dónde está guardado el código que quiero ejecutar.

    //Las funciones callback se ejecutan en el Contexto de Ejecución de la función que las recibe
  }

  function fnCb() {
    console.log(this.contexto);
  }

  //obj genera un Entorno Léxico
  const contexto = "Contexto obj";
  /* const obj = {
    contexto: contexto,
    fnCb: fnCb,
  }; */
  const obj = {
    contexto,
    fnCb,
  };
  //console.log("Valor en la clave contexto", obj.contexto);

  //fnImplicit(); //call-site => La IIFE
  obj.fnCb(); //call-site => obj
  //console.log(obj);

  /* 
    Busco obtener "Contexto obj" pero obtengo "Auto-invocada"
      => call-stack == global -> IIFE -> fnImplicit -> obj.fnCb
      => call-site => IIFE (this === IIFE)
  */

  fnImplicit(obj.fnCb);
})();

//this.contexto = "Global";
//fnImplicit(obj.fnCb); call-site => Objeto window (this === global) => console.log("Global")

/*
  Explicit Binding - Forzar la ejecución de una función en un Contexto particular
    => call - El primer argumento es el Contexto (objeto). El resto, son los argumentos requeridos por la función a ejecutarse
    => apply - El primer argumento es el Contexto (objeto). El segundo un array que contiene todos los argumentos necesarios para la función a ejecutarse
    => bind
*/

//call
(() => {
  function saludar(saludo, nombre) {
    console.log(`${saludo} ${nombre}. Estoy en ${this.contexto}`);
  }

  const contextoNuevo = {
    contexto: "Objeto contextoNuevo - call",
  };

  //saludar(); - Ejecución de saludar
  saludar.call(contextoNuevo, "Hola", "Pepe"); //Ejecuto la función call (call-site -> IIFE)
  console.log(saludar);
})();

//apply
(() => {
  function saludar(saludo, nombre) {
    console.log(`${saludo} ${nombre}. Estoy en ${this.contexto}`);
  }

  const contextoNuevo = {
    contexto: "Objeto contextoNuevo - apply",
  };

  saludar.apply(contextoNuevo, ["Hola", "Pepe"]);
})();

//bind
(() => {
  const obj = {
    contexto: "Contexto obj",
    elContexto: function () {
      console.log(`Me ejecuto en el ${this.contexto}`);
    },
  };

  obj.elContexto();

  const obj1 = {
    elContexto: obj.elContexto,
  };

  obj1.elContexto(); //Anda a ver qué hay en obj.elContexto. Ejecutalo.

  const obj2 = {
    elContexto: obj.elContexto.bind(obj),
  };

  obj2.elContexto(); //Anda a ver qué hay en obj.elContexto. Ejecutalo como si estuvieras en obj.
})();

//Hard Binding
(() => {
  function unaFn(n) {
    return this.a + n;
  }

  const obj = {
    a: 2,
  };

  const otraFn = function (arr) {
    //this === IIFE
    //unaFn(); - this === otraFn
    return unaFn.apply(obj, arr); //Explicit binding this === obj
  };

  const elResultado = otraFn([3]); //call-site - IIFE
  console.log(elResultado);
})();

/*
  Lexical Binding (Arrow Function)
*/
(() => {
  function unaFn() {
    return () => {
      console.log(this.a);
    };
  }

  const obj1 = {
    a: 2,
  };

  const obj2 = {
    a: 3,
  };

  //Al ejecutar unaFn con call en obj1. otraFn "se guarda en obj1 (contexto léxico === obj1)". otraFn es una Arrow Function (NO TIENEN CONTEXTO DE EJECUCIÓN)
  const otraFn = unaFn.call(obj1);

  //Quiero que otraFn tenga como Contexto de Ejecución obj2 -> Como es Arrow Function, no tiene Contexto de Ejecución. Usan el Contexto Léxico
  otraFn.call(obj2);
})();

/*
  new Binding - Crear un nuevo Objeto con un Explicit Binding del this
*/

(() => {
  function unaFn(a) {
    this.a = a;
    this.otraFn = function () {
      console.log(`Función declarada en unaFn: ${this.a}`);
    };
  }

  const objContexto = new unaFn(20);
  console.log(objContexto);
  console.log(objContexto.a);
  objContexto.otraFn();

  const otroContexto = new unaFn(100);
  console.log(otroContexto);
  console.log(otroContexto.a);
  otroContexto.otraFn();

  //Sin new
  let a = 20;
  let otraFn = function () {
    console.log(`Función declarada en unaFn: ${this.a}`);
  };

  const unContexto = {
    a,
    otraFn,
  };

  unContexto.otraFn();

  a = 100;

  const nuevoContexto = {
    a,
    otraFn,
  };

  nuevoContexto.otraFn();
})();

/*
  POO - Tradicional (Java, PHP, C#, etc)
    => Clase - "Plantilla" que se usa para crear Objetos
    => Objeto - "Copia" (instancia) de la Clase que se utiliza para trabajar

  JS -> Lenguaje de Programación Orientado a Objetos basado en Prototipos
    => NO EXISTEN LAS CLASES
    => Usa Objetos Prototipo
      -> "Plantilla" que se usa para crear Objetos
    => Todos los Objeto arrancan en Prototipo Object
    => Todos los elementos almacenados en el Prototype pueden ser utilizados por el Objeto Actual
*/

console.log(Function);
console.log(Array);
console.log(Number);
console.log(String);
console.log((3.14).toFixed(1)); //toFixed está en el Objeto Number
console.log("Hola".indexOf("a")); //indexOf está en el Objeto String
console.log([1, 2, 3].find((el) => el === 2)); //find está en el Objeto Array

//Prototype - POO pre-ES6
(() => {
  //Crear el Prototype (Objeto Plano) que almacena datos
  const Persona = {
    setNombre: function (nombre) {
      this.nombre = nombre;
    },
    crearPersona: function (nombre) {
      this.setNombre(nombre);
    },
    saludar: function () {
      console.log(`Hola soy ${this.nombre}`);
    },
  };

  //Crear un Nuevo Objeto usando el Prototype (Object.create)
  const objPersona = Object.create(Persona);
  objPersona.crearPersona("Pepe");
  objPersona.saludar();
  console.log(objPersona);

  /*
    Cadena de Prototipos == "Árbol de Herencias"
  */

  const Empleado = Object.create(Persona); //Prototype => Persona

  Empleado.setPuesto = function (puesto) {
    this.puesto = puesto;
  };
  Empleado.crearEmpleado = function (nombre, puesto) {
    this.setNombre(nombre);
    this.setPuesto(puesto);
  };
  Empleado.decirPuesto = function () {
    console.log(`Hola soy ${this.nombre}. Trabajo en ${this.puesto}`);
  };

  const objEmpleado = Object.create(Empleado); //Cadena de Prototypes -> Object - Persona - Empleado

  objEmpleado.crearEmpleado("Pepa", "Programación");
  objEmpleado.decirPuesto();
})();

//POO ES6
(() => {
  class Persona {
    constructor(nombre) {
      this.nombre = nombre;
    }

    saludar() {
      console.log(`Hola soy ${this.nombre}`);
    }
  }

  const persona = new Persona("Pepe");
  persona.saludar();

  class Empleado extends Persona {
    constructor(nombre, puesto) {
      super(nombre);
      this.puesto = puesto;
    }

    decirPuesto() {
      console.log(`Hola soy ${this.nombre}. Trabajo en ${this.puesto}`);
    }
  }

  const empleado = new Empleado("Pepa", "Programación");
  empleado.decirPuesto();
})();
