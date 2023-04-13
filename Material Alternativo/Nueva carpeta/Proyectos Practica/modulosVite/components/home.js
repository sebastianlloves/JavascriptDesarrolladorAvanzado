import "./home.css";
import view from "./home.html?raw";
import getElement from "../utils/getElement";
import removeActive from "../utils/removeActive";
import fetchUser from "../utils/fetchUser";

export const home = () => view;

export const generateUser = async () => {
  const $img = getElement(".user-img");
  const $title = getElement(".user-title");
  const $value = getElement(".user-value");
  const $btnName = getElement(".icon-name");
  const $buttonsList = document.querySelector(".values-list");
  const $buttons = document.querySelectorAll(".icon");

  const person = await fetchUser();
  $img.src = person.image;
  $title.textContent = `My name is`;
  $value.textContent = person.name;
  removeActive($buttons); //Limpiar estilos botones
  $btnName.classList.add("active"); //Agregar estilo al botón inicial

  const addBtnListener = ({ target }) => {
    const btn = target;
    if (btn.classList.contains("far") || btn.classList.contains("fas")) {
      const label = btn.dataset.label;
      $title.textContent = `My ${label} is`;
      $value.textContent = person[label];
      removeActive($buttons);
      btn.parentNode.classList.add("active");
    }
  };

  $buttonsList.addEventListener("click", addBtnListener);
};
