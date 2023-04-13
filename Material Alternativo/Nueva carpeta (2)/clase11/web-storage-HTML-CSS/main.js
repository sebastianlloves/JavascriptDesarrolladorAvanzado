//Elementos del DOM
const htmlElem = document.querySelector("html");
const pElem = document.querySelector("p");
const imgElem = document.querySelector("img");
//Elementos del Form
const bgColorForm = document.getElementById("bgcolor");
const fontForm = document.getElementById("font");
const imageForm = document.getElementById("image");

//Checkeo de Storage
if (!localStorage.getItem("bgColor")) populateStorage();
else setStyles();

//Actualizar storage
function populateStorage() {
  localStorage.setItem("bgColor", bgColorForm.value);
  localStorage.setItem("font", fontForm.value);
  localStorage.setItem("image", imageForm.value);
  setStyles();
}

//Actualizar CSS
function setStyles() {
  //Valores en Storage
  const currentColor = localStorage.getItem("bgColor");
  const currentFont = localStorage.getItem("font");
  const currentImage = localStorage.getItem("image");

  //Sincronizar Formulario
  bgColorForm.value = currentColor;
  fontForm.value = currentFont;
  imageForm.value = currentImage;

  //Aplicar CSS
  htmlElem.style.backgroundColor = `#${currentColor}`;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute("src", currentImage);
}

const form = document.querySelector("form");
form.addEventListener("change", ({ target: { id } }) => {
  //const id = e.target.id;
  if (id === "bgcolor" || id === "font" || id === "image") populateStorage();
});
