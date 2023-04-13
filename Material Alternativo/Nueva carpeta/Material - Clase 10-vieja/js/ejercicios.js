/*
  Utilizar el Patrón Módulo para crear:
    => Un módulo que exporte Array de Objetos Empleado. La Clase Empleado debe inicializarse con un nombre y una edad; también debe tener un Método "imprimir" que retorne una fila de tabla con los datos de almacenados en los atributos nombre y edad. El Array debe contener, al menos, 2 empleados.
    => Un módulo que importe el Array con los Objetos Empleado y use el Método "imprimir" de cada empleado para agregar una nueva fila a una tabla creada de forma dinámica. Los textos de cada th deben corresponder con los nombre de los atributos del Objeto Empleado
*/

(() => {
  //Exportar
  window.Empleados = function () {
    //BD
    const empleados = [];

    //Crear Empleado
    class Empleado {
      constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
      }

      imprimir() {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        tr.appendChild((td.textContent = this.nombre));
        tr.appendChild((td.textContent = this.edad));
        return tr;
      }
    }

    //Guardar Empleado
    empleados.push(new Empleado("Pepe", "28"));
    empleados.push(new Empleado("Pepa", "25"));

    return empleados;
  };
})();

(() => {
  //Importar
  const empleados = window.Empleados();

  //Tabla dinámica
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  //Crear thead
  const tr = document.createElement("tr");
  for (const key in empleados[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  //Crear tbody
  empleados.forEach((empleado) => {
    const tr = document.createElement("tr");
    for (const key in empleado) {
      const td = document.createElement("td");
      td.textContent = empleado[key];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  document.querySelector(".modulo").appendChild(table);
})();

/*
  Utilizando la siguente API Rest "https://dog.ceo/api/breed/beagle/images/random" crear una aplicación que aplique el Patrón Singleton para impedir que el usuario pueda solicitar la imagen de un perro perteneciente a la misma raza 2 veces siguida.
*/
(() => {
  class Peticion {
    constructor(url) {
      //Evaluar petición
      if (Peticion.hecha === url) {
        let obj = { str: "usada" };
        return obj;
      }

      this.url = url;

      Peticion.hecha = this.url;

      return fetch(url);
    }
  }

  //Llamada Inicial
  const llamada = new Peticion(
    "https://dog.ceo/api/breed/beagle/images/random"
  );
  llamada
    .then((data) => data.json())
    .then((data) => {
      document.querySelector(".perro").setAttribute("src", data.message);
    });

  //Nueva llamada
  let raza = "beagle";

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    raza = document.querySelector("input[name=razas]:checked").id;
    let url = `https://dog.ceo/api/breed/${raza}/images/random`;

    const llamada = new Peticion(url);

    if (llamada.hasOwnProperty("str")) {
      let p = document.querySelector("p");
      p.classList.remove("d-none");
      p.classList.add("d-block");
    } else {
      llamada
        .then((data) => data.json())
        .then((data) => {
          document.querySelector(".perro").setAttribute("src", data.message);
        });

      let p = document.querySelector("p");
      p.classList.remove("d-block");
      p.classList.add("d-none");
    }
  });
})();

/*
  Crear una Aplicación que use el Patrón Observador para permitir la selección de un color. El cambio de selección debe verse en 3 elementos distintos:
    => 1 debe mostrar el nombre del color seleccionado
    => 1 debe cambiar su color de fondo según la selección realizada
    => 1 debe cambiar el color de la ltra según le selección realizada
*/

(() => {
  //Publicador
  class Color {
    constructor() {
      this.observers = [];
    }

    subscribe(o) {
      this.observers.push(o);
    }

    notify(change) {
      this.observers.forEach((observer) => {
        observer.notify(change);
      });
    }
  }

  //Publicación
  class ColorChange extends Color {
    constructor() {
      super();
      this.color = "";
    }

    notify(color) {
      this.color = color;

      super.notify(this);
    }
  }

  //Suscriptores
  class NombreColor {
    notify(colorChange) {
      document.querySelector("#color>p").textContent = colorChange.color;
    }
  }

  class FondoColor {
    notify(colorChange) {
      document.querySelector("#fondo").style.backgroundColor =
        colorChange.color;
    }
  }

  class TextoColor {
    notify(colorChange) {
      document.querySelector("#texto>p").style.color = colorChange.color;
    }
  }

  //Crear Publicación
  let colorChange = new ColorChange();

  //Crear Suscriptores
  let nombreColor = new NombreColor();
  let fondoColor = new FondoColor();
  let textoColor = new TextoColor();

  //Suscribir a Publicación
  colorChange.subscribe(nombreColor);
  colorChange.subscribe(fondoColor);
  colorChange.subscribe(textoColor);

  //Ejecución
  window.onload = function () {
    colorChange.notify(document.querySelector("#colores").value);
  };

  document.querySelector("#colores").addEventListener("change", function () {
    colorChange.notify(this.value);
  });
})();
