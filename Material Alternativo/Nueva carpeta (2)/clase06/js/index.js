//Tomar elementos del HTML
const imgs = document.querySelectorAll("img");
const embeds = document.querySelectorAll("embed");

function manejadorArchivos(archivo, visualizador, hermano) {
  if (hermano) {
    const ruta = URL.createObjectURL(archivo);
    //console.log(ruta);
    visualizador.setAttribute("src", ruta);
    visualizador.classList.remove("d-none");
    hermano.classList.add("d-none");
  } else {
    const ruta = URL.createObjectURL(archivo);
    visualizador.setAttribute("src", ruta);
    visualizador.classList.remove("d-none");
  }
}

(() => {
  const form = document.getElementById("ejemploBlob");
  //console.log(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputFile = form[0];
    //console.log(inputFile);

    //Crear una URL temporal para JS encuentre el archivo binario que quiero mostrar
    const archivo = inputFile.files[0];
    //console.log(archivo);

    switch (archivo.type) {
      case "image/png":
        manejadorArchivos(archivo, imgs[0], embeds[0]);
        break;

      case "application/pdf":
        manejadorArchivos(archivo, embeds[0], imgs[0]);
        break;
    }
  });
})();

function ajax(url) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.open("GET", url);
  xhr.send();
  return xhr;
}

(() => {
  /* const getImage = ajax("assets/javascript.png");

  getImage.addEventListener("load", () => {
    if (getImage.status === 200) {
      const img = getImage.response;
      const visualizador = imgs[1];

      manejadorArchivos(img, visualizador);
    } else {
      const err = new Error("No se pudo obtener la imagen");
      console.log(err);
    }
  });

  const getPdf = ajax("assets/pdf.pdf");

  getPdf.addEventListener("load", () => {
    if (getPdf.status === 200) {
      const pdf = getPdf.response;
      const visualizador = embeds[1];

      manejadorArchivos(pdf, visualizador);
    } else {
      const err = new Error("No se pudo obtener el archivo pdf");
      console.log(err);
    }
  }); */

  const form = document.getElementById("traerArchivo");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const section = form[0];
    //console.log(section);
    const nombreArchivo = section.value;
    //console.log(archivo[archivo.length - 4]);
    const inicio = nombreArchivo.length - 3;
    const fin = nombreArchivo.length;
    //console.log(archivo.slice(inicio, fin));
    const ext = nombreArchivo.slice(inicio, fin);
    //console.log(ext);
    const url = `assets/${nombreArchivo}`;
    //console.log(url);

    const getFile = ajax(url);

    getFile.addEventListener("load", () => {
      if (getFile.status === 200) {
        const archivo = getFile.response;

        switch (ext) {
          case "pdf": {
            const hermano = imgs[1];
            const visualizador = embeds[1];
            manejadorArchivos(archivo, visualizador, hermano);
            break;
          }

          case "png": {
            const hermano = embeds[1];
            const visualizador = imgs[1];
            manejadorArchivos(archivo, visualizador, hermano);
            break;
          }
        }
      } else {
        console.log(getFile.response);
      }
    });
  });
})();

(() => {
  const progressBar = document.querySelector("progress");
  const p = document.querySelector(".progreso");

  const getImage = ajax("assets/javascript.png");

  getImage.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const porcentaje = (e.loaded * 100) / e.total;
      progressBar.value = porcentaje;
      p.innerHTML = `Descarga al ${parseInt(porcentaje)}%`;
    }
  });

  getImage.addEventListener("load", () => {
    if (getImage.status === 200) {
      const archivo = getImage.response;
      const visualizador = imgs[2];
      manejadorArchivos(archivo, visualizador);
    } else {
      console.log(getImage.response);
    }
  });
})();

const dropZones = document.querySelectorAll(".dragDrop");

(() => {
  const dropZone = dropZones[0];
  //console.log(dropZone);
  const inputFile = document.getElementById("archivoDrop");
  const visualizador = imgs[3];
  const inputText = document.getElementById("texto");

  //Evento change -> se dispara cuando cambia el valor almacenado en el input. Es necesario que el input pierda el foco
  inputText.addEventListener("change", (e) => {
    //console.log(e.target.value);
    const {
      target: { value },
    } = e;
    console.log(value);
  });

  //Evento input -> Se dispara cada vez que cambia el value del input
  inputText.addEventListener("input", ({ target: { value } }) => {
    console.log(value);
  });

  inputFile.addEventListener("change", () => {
    const archivo = inputFile.files[0];
    manejadorArchivos(archivo, visualizador);
  });

  /*
    API Drag&Drop
      => Drop Zone 
        => Cualquier elemento del HTML que ocupe un espacio en la ventana del navegador
  */

  dropZone.addEventListener("dragenter", (e) => {
    e.preventDefault();
    console.log("entré");
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    console.log("salí");
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("me muevo por la drop zone");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const { dataTransfer } = e;
    //console.log(dataTransfer);
    const archivo = dataTransfer.files[0];
    manejadorArchivos(archivo, visualizador);
    console.log("solté el elemento en la drop zone");
  });
})();

function subirArchivos(archivos) {
  //Crear un Objeto FormData que permita automatizar la conversión de los archivos para el envío por AJAX
  const formData = new FormData();
  //console.log(formData);

  //Almacenar los archivos en el formData
  for (const archivo of archivos) {
    const nombreArchivo = archivo.name;
    const ruta = `assets/${nombreArchivo}`;
    formData.append(nombreArchivo, archivo, ruta);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "url");
  xhr.send(formData);
  return xhr;
}
//subirArchivos();
(() => {
  const dropZone = dropZones[1];
  const inputFile = document.getElementById("archivoDrop1");

  inputFile.addEventListener("change", () => {
    const archivos = inputFile.files;
    const postArchivos = subirArchivos(archivos);

    postArchivos.addEventListener("load", () => {
      console.log(postArchivos.response);
    });
  });

  dropZone.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const archivos = e.dataTransfer.files;
    const postArchivos = subirArchivos(archivos);

    postArchivos.addEventListener("load", () => {
      console.log(postArchivos.response);
    });
  });
})();
