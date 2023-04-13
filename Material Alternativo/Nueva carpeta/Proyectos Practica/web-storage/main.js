//Elementos del DOM
const htmlElem = document.querySelector("html");
const pElem = document.querySelector("p");
const imgElem = document.querySelector("img");
//Elementos del Form
const bgcolorForm = document.getElementById("bgcolor");
const fontForm = document.getElementById("font");
const imageForm = document.getElementById("image");

//Si no hay un item bgColor, ejecutamos la función creadora
//Si hay item bgColor, aplicamos los estilos
if (!localStorage.getItem("bgcolor")) populateStorage();
else setStyles();

function populateStorage() {
  //Creación de elementos de storage
  localStorage.setItem("bgcolor", bgcolorForm.value);
  localStorage.setItem("font", fontForm.value);
  localStorage.setItem("image", imageForm.value);
  //Aplicación de estilos
  setStyles();
}

function setStyles() {
  //Almacenamiento de valores actuales
  const currentColor = localStorage.getItem("bgcolor");
  const currentFont = localStorage.getItem("font");
  const currentImage = localStorage.getItem("image");

  //Cambio de valores en el Form
  bgcolorForm.value = currentColor;
  fontForm.value = currentFont;
  imageForm.value = currentImage;

  //Aplicación de estilos CSS
  htmlElem.style.backgroundColor = `#${currentColor}`;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute("src", currentImage);
}

//Actualizar valores en storage cuando cambian los input correspondientes
document.querySelector("form").addEventListener("change", (e) => {
  const id = e.target.id;
  if (id === "bgcolor" || id === "font" || id === "image") populateStorage();
});
