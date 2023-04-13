//Elementos HTML
const img = document.querySelectorAll(".imagen");
const embed = document.querySelectorAll("embed");

function manejadorArchivos(archivo, visualizador, hermano) {
  /*
    URL.createObjectURL crea una url temporal que podemos
    usar para mostrar el archivo subido. Hay que entender
    que esta URL no sirve para enviar un archivo a una
    BD o API
  */
  if (hermano) {
    const url = URL.createObjectURL(archivo);
    visualizador.classList.remove("d-none");
    visualizador.setAttribute("src", url);
    hermano.classList.add("d-none");
  } else {
    const url = URL.createObjectURL(archivo);
    visualizador.classList.remove("d-none");
    visualizador.setAttribute("src", url);
  }
}

//Lectura de archivos binarios desde input:file
(() => {
  const form = document.querySelector("#ejemploBlob");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputFile = form[0];
    console.log("Array de Archivos subidos:", inputFile.files);

    //Crear URL para utilizar el archivo
    const archivo = inputFile.files[0];

    switch (archivo.type) {
      case "image/png":
        manejadorArchivos(archivo, img[0], embed[0]);
        break;

      case "application/pdf":
        manejadorArchivos(archivo, embed[0], img[0]);
        break;
    }
  });
})();

//Lectura de archivos binarios mediante AJAX
function ajax(url) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob"; //Declarar tipo de archivo esperado
  xhr.open("get", url);
  xhr.send();
  return xhr;
}

const getImage = ajax("assets/javascript.png");
getImage.addEventListener("load", () => {
  if (getImage.status === 200) {
    manejadorArchivos(getImage.response, img[1]);
  }
});

const getPdf = ajax("assets/pdf.pdf");
getPdf.addEventListener("load", () => {
  if (getPdf.status === 200) {
    manejadorArchivos(getPdf.response, embed[1]);
  }
});

//Barra de progreso
(() => {
  const progress = document.querySelector("progress");
  const p = document.querySelector(".progreso");

  const getImage = ajax("assets/javascript.png");
  getImage.addEventListener("load", () => {
    if (getImage.status === 200) {
      manejadorArchivos(getImage.response, img[2]);
    }
  });

  //Relentizar transferencia => Network/Sin Regulación (Firefox)
  getImage.addEventListener("progress", (e) => {
    /*
        lengthComputable => booleano que indica la presencia de datos
        loaded => datos obtenidos hasta el momento
        total => cantidad total de datos del archivo
    */
    if (e.lengthComputable) {
      const porcentaje = (e.loaded * 100) / e.total;
      progress.value = porcentaje;
      p.innerText = `Descarga al ${parseInt(porcentaje)}%`;
    }
  });
})();

//Drag And Drop
(() => {
  const dropZone = document.querySelectorAll(".dragDrop")[0];
  const input = document.querySelector("#archivoDrop");
  const visualizadorImg = document.getElementById("visualizadorImg");

  input.addEventListener("change", () => {
    manejadorArchivos(input.files[0], visualizadorImg);
  });

  dropZone.addEventListener("dragenter", (e) => {
    //Se dispara cuando entramos en la drop zone
    e.preventDefault();
  });

  dropZone.addEventListener("dragleave", (e) => {
    //Se dispara cuando salimos de la drop zone
    e.preventDefault();
  });

  dropZone.addEventListener("dragover", (e) => {
    //Se dispara constantemente mientras estemos en la drop zone
    e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
    //Se dispara cuando soltamos el archivo en la drop zone
    e.preventDefault();
    manejadorArchivos(e.dataTransfer.files[0], visualizadorImg);
  });
})();

//Drag&Drop Progress Upload

function subirArchivos(archivos) {
  /*
    FormData 
      => Toma/crea datos de formulario. 
      => Permite codificar datos binarios a string para facilitar la transferencia AJAX
      => .entries() - Retorna un iterable
        => Los iterables son objetos que no pueden ser recorridos por un 
            bucle for tradicional pero sí podemos usar un for...of.
            Integran dentro de sus métodos un método conocido cono next() que devuelve un objeto
            con dos claves (value, done) que nos permiten saber cuál es
            el dato almacenado en la posición actual y si hay más datos
            almacenados dentro del iterable
  */

  const data = new FormData();

  //Creación de los datos para ser transferidos por AJAX
  for (const archivo of archivos) {
    const path = `assets/${archivo.name}`;
    data.append(archivo.name, archivo, path);
  }

  //Ejemplos del trabajo de FromData
  console.log("Retorno de data.entries().next():", data.entries().next());
  for (const iterator of data.entries()) {
    console.log("for...of de data.entries():", iterator);
  }

  /*
    Cuando se hace un POST para subir archivos
    es necesario configurar el servidor para que
    almacene el archivo y cree una URL para consumo
    desde el Front End
  */
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "url");
  xhr.send(data);
}

(() => {
  const dropZone = document.querySelectorAll(".dragDrop")[1];
  const input = document.querySelector("#archivoDrop1");

  input.addEventListener("change", () => {
    subirArchivos(input.files);
  });

  dropZone.addEventListener("dragenter", (e) => e.preventDefault());

  dropZone.addEventListener("dragleave", (e) => e.preventDefault());

  dropZone.addEventListener("dragover", (e) => e.preventDefault());

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    subirArchivos(e.dataTransfer.files);
  });
})();
