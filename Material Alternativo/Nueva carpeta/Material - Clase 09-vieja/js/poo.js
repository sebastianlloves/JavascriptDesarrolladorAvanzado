/*
    POO ES5
*/

() => {
  function Vehiculo(modelo, marca) {
    this._modelo = modelo;
    this.setModelo = function (modelo) {
      this._modelo = modelo;
    };
    this.getModelo = function () {
      return this._modelo;
    };

    this._marca = marca;
    this.setMarca = function (marca) {
      this._marca = marca;
    };
    this.getMarca = function () {
      return this._marca;
    };
  }

  Vehiculo.prototype.acelerar = function () {
    console.log("Estoy acelerando");
  };
  Vehiculo.prototype.frenar = function () {
    console.log("Frené");
  };

  function Auto(modelo, marca, color) {
    this.super = Vehiculo;
    this.super(modelo, marca);
    this._color = color;
    this.setColor = function (color) {
      this._color = color;
    };
    this.getColor = function () {
      return this._color;
    };
  }

  Auto.prototype = new Vehiculo();
  Auto.prototype.constructor = Auto;
  Auto.prototype.acelerar = function () {
    console.log("Soy un Auto acelerando");
  };
  Auto.prototype.describir = function () {
    console.log(
      `Soy un Auto de marca: ${this._marca}, modelo: ${this._modelo} y color: ${this._color}`
    );
  };
};

/*
    POO ES6
*/

(() => {
  class Vehiculo {
    constructor(modelo, marca) {
      this._modelo = modelo;
      this._marca = marca;
    }

    //Getters y Setters
    set setModelo(modelo) {
      this._modelo = modelo;
    }
    get getModelo() {
      return this._modelo;
    }

    set setMarca(marca) {
      this._marca = marca;
    }

    get getMarca() {
      return this._marca;
    }

    acelerar() {
      console.log("Estoy acelerando");
    }

    frenar() {
      console.log("Frené");
    }
  }

  class Auto extends Vehiculo {
    constructor(modelo, marca, color) {
      super(modelo, marca);
      this._color = color;
    }

    //Getters y Setters
    set setColor(color) {
      this._color = color;
    }

    get getColor() {
      return this._color;
    }

    acelerar() {
      console.log("Soy un Auto acelerado");
    }

    describir() {
      console.log(
        `Soy un Auto de marca: ${this._marca}, modelo: ${this._modelo} y color: ${this._color}`
      );
    }
  }
})();

console.log("\nDelegación de Métodos del Prototype");
(() => {
  /*
    Delegación del prototype
  */

  const prototipoPersona = {
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

  const prototipoEmpleado = Object.create(prototipoPersona);
  prototipoEmpleado.setPuesto = function (puesto) {
    this.puesto = puesto;
  };
  prototipoEmpleado.crearEmpleado = function (nombre, puesto) {
    this.setNombre(nombre);
    this.setPuesto(puesto);
  };
  prototipoEmpleado.decirPuesto = function () {
    console.log(`Mi puesto es ${this.puesto}`);
  };

  // crear Objeto Persona
  const persona = Object.create(prototipoPersona);
  persona.crearPersona("Pepe");
  persona.saludar();
  console.log("Prototype de persona:", Object.getPrototypeOf(persona));

  // crear Objeto Empleado
  const empleado = Object.create(prototipoEmpleado);
  empleado.crearEmpleado("Pepa", "Programadora");
  empleado.saludar();
  empleado.decirPuesto();
  console.log("Prototype de empleado:", Object.getPrototypeOf(empleado));

  /*
    Gracias a la forma en que los Objetos se relacionan entre sí, es posible
    armar una cadena de prototipos simplemente creando un nuevo Objeto con
    Object.create(obj)
  */
})();
