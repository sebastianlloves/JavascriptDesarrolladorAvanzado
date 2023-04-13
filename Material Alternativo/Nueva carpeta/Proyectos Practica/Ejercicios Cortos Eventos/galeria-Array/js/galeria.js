const images = [
  "images/galeria-0.jpg",
  "images/galeria-1.jpg",
  "images/galeria-2.jpg",
  "images/galeria-3.jpg",
  "images/galeria-4.jpg",
  "images/galeria-5.jpg",
  "images/galeria-6.jpg",
];

const imgCentral = document.querySelector(".imgCentral");

cambiarImagen = (e) => imgCentral.setAttribute("src", e.target.src); //Función que maneja el cambio de imagenes

recorrerGaleria = (e) => {
  const src = imgCentral.getAttribute("src");

  //Función que maneja el recorrido de la galeria mediante las flechas
  if (e.target.classList.contains("flechaIzquierda")) {
    const indexImgActual = src[src.search("-") + 1];
    let indexImgNueva = Number(indexImgActual) - 1;

    if (indexImgNueva == -1) indexImgNueva = 6;
    imgCentral.setAttribute("src", `${images[indexImgNueva]}`);
  } else {
    const indexImgActual = src[src.search("-") + 1];
    let indexImgNueva = Number(indexImgActual) + 1;

    if (indexImgNueva == 6) indexImgNueva = 0;
    imgCentral.setAttribute("src", `${images[indexImgNueva]}`);
  }
};

//Escuchas de Evento
document.addEventListener("click", (e) => {
  if (e.target.matches(".flecha")) recorrerGaleria(e);

  if (e.target.matches(".lista img")) cambiarImagen(e);
});
