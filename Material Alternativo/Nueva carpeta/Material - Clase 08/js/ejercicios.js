/*
  Utilizando el Patrón Iterador, crear una galería de imágenes
*/

//Elementos del HTML
const imgCentral = document.querySelector(".imgCentral");

const images = [
  "imagesGaleria/galeria-1.jpg",
  "imagesGaleria/galeria-2.jpg",
  "imagesGaleria/galeria-3.jpg",
  "imagesGaleria/galeria-4.jpg",
  "imagesGaleria/galeria-5.jpg",
  "imagesGaleria/galeria-6.jpg",
];

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
    if (this.index === 0) this.index = this.arr.length - 1;
    else this.index -= 1;
  };
  this.hasPrev = () => this.index - 1 > 0;
  return {
    first,
    next,
    back,
    current,
    hasNext,
    hasPrev,
    reset,
  };
}

const iterable = crearIterable(images);

cambiarImagen = (e) => imgCentral.setAttribute("src", e.target.src);

recorrerGaleria = (e) => {
  const src = imgCentral.getAttribute("src");

  if (e.target.classList.contains("flechaIzquierda")) {
    if (iterable.hasPrev()) {
      iterable.back();
      imgCentral.setAttribute("src", iterable.current());
    } else {
      iterable.back();
      imgCentral.setAttribute("src", iterable.current());
    }
  } else {
    if (iterable.hasNext()) {
      imgCentral.setAttribute("src", iterable.next().value);
    } else {
      iterable.reset();
      imgCentral.setAttribute("src", iterable.first());
    }
  }
};

//Escuchas de Evento
document.addEventListener("click", (e) => {
  if (e.target.matches(".flecha")) recorrerGaleria(e);

  if (e.target.matches(".lista img")) cambiarImagen(e);
});

/*
  Utilizando la Programación Reactiva, realizar una calculadora que pueda ejecutar las 4 funciones básicas (sumar, restar, multiplicar, dividir).
    => Sólo debe operar con números de 1 dígito (excluyendo el resultado de las operaciones)
    => No debe operar con más de 2 decimales (.toFixed(2))
    => El visor de la calculadora debe arrancar mostrando el 0.
    => El visor debe cambiar como consecuencia del Evento Click de los distintos botones
    => El visor debe mostrar los valores ingresados. No debe mostrar los operadores
    => No mostrar el resultado si no se usa el "="
    => El uso de "C" debe reiniciar el estado de la calculadora. El visor debe mostrar 0 
*/

//Elementos del HTML
const calculadora = document.querySelector(".calculator");
const visor = document.getElementById("result");

//Observer para manejar estado de la calculadora
function stateCalculadora() {
  return {
    state: {
      result: 0,
      input: [],
      operator: "",
    },
    subscribers: [],
    suscribe: function (subscriber) {
      this.subscribers.push(subscriber);
    },
    notify: function (value) {
      this.subscribers.forEach((subscriber) => {
        subscriber.notify(value);
      });
    },
    start,
    setState,
    update,
    operate,
    addNumberToInput,
    addOperator,
    clearResult,
    showResult,
    toFixed,
  };
}

//Operaciones de State
function start() {
  this.notify(this.state);
}

function setState(newState) {
  const state = this.state;
  for (const key in newState) {
    if (state.hasOwnProperty(key)) {
      state[key] = newState[key];
    }
  }
  return state;
}

function update(btn) {
  const isNumber = btn.classList.contains("number");
  const hasOperator = this.state.operator;

  if (isNumber && !hasOperator) {
    this.state = this.addNumberToInput(btn);
    this.notify(this.state);
  } else if ((!isNumber && !hasOperator) || (!isNumber && hasOperator)) {
    const btnType = btn.textContent;

    const isType =
      btnType === "+" || btnType === "-" || btnType === "*" || btnType === "/";

    if (this.state.operator !== btnType && isType) {
      this.state = this.addOperator(btnType);
    } else {
      switch (btnType) {
        case "C": {
          this.state = this.clearResult();
          this.notify(this.state);
          break;
        }
        case "=": {
          this.state = this.showResult();
          this.notify(this.state);
          break;
        }
      }
    }
  } else if (isNumber && hasOperator) {
    const inputLength = this.state.input.length;

    this.state = this.addNumberToInput(btn);
    this.notify(this.state);

    //Operar
    switch (this.state.operator) {
      case "+":
        this.operate((n1, n2) => n1 + n2);
        break;
      case "-":
        this.operate((n1, n2) => n1 - n2);
        break;
      case "*":
        this.operate((n1, n2) => n1 * n2);
        break;
      case "/":
        this.operate((n1, n2) => n1 / n2);
        break;
    }
  }
}

function operate(operation) {
  const input = this.state.input;

  let result = input[0];
  const arrLength = this.state.input.length;

  for (let index = 1; index < arrLength; index++) {
    const num = input[index];
    result = operation(result, num);
  }

  const newState = {
    result: this.toFixed(result),
    input: [result],
  };

  this.state = this.setState(newState);
}

function addNumberToInput(btn) {
  const btnNumber = btn.textContent;
  const newState = {
    input: [...this.state.input, Number(btnNumber)],
  };

  return this.setState(newState);
}

function addOperator(btnType) {
  const newState = {
    operator: btnType,
  };

  return this.setState(newState);
}

function clearResult() {
  const newState = {
    operator: "C",
    result: 0,
    input: [],
  };

  return this.setState(newState);
}

function showResult() {
  const newState = {
    operator: "=",
  };

  return this.setState(newState);
}

function toFixed(num) {
  //Impide el trabajo con más de 2 decimales
  if (Number.isInteger(num)) {
    return num;
  } else {
    return Number(num.toFixed(2));
  }
}

//Observador para manipular la vista
function updateView(react) {
  return {
    notify: react,
  };
}

//Operaciones de Vista
const viewInput = updateView((state) => {
  const { result, input, operator } = state;

  //Evaluación de tipo de vista
  if (!operator) {
    if (input.length < 1) visor.textContent = 0;
    else visor.textContent = input[input.length - 1];
  } else if (!result && operator === "C") {
    visor.textContent = 0;
  } else if (result && operator === "=") {
    visor.textContent = result;
  } else {
    visor.textContent = input[input.length - 1];
  }
});

//Ejecutar Observer y Observador
const state = stateCalculadora();
state.suscribe(viewInput);

//Delegación de Evento Click para actualización de vista
calculadora.addEventListener("click", ({ target }) => {
  state.update(target);
});

//Inicializar
state.start();
