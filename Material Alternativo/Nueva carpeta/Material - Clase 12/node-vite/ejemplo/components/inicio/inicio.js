import inicio from "./inicio.html?raw";
import img from "../../assets/tree.jpg";

export default () => {
  const vista = document.createElement("div");

  const $img = `<img src='${img}' class='img'>`;
  vista.innerHTML = inicio;
  vista.innerHTML += $img;

  return vista;
};
