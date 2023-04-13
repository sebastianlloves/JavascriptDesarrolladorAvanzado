import "./index.css";
import getElement from "./utils/getElement.js";
import removeActive from "./utils/removeActive.js";
import fetchUser from "./utils/fetchUser.js";

const $img = getElement(".user-img");
const $title = getElement(".user-title");
const $value = getElement(".user-value");
const $btn = getElement(".btn");
const $btns = document.querySelectorAll(".icon");

const showUser = async () => {
  const person = await fetchUser();
  // display user
  $img.src = person.image;
  $title.textContent = `My name is`;
  $value.textContent = person.name;
  removeActive($btns);
  $btns[0].classList.remove("active");
  $btns.forEach((btn) => {
    const label = btn.dataset.label;
    btn.addEventListener("click", () => {
      $title.textContent = `My ${label} is`;
      $value.textContent = person[label];
      removeActive($btns);
      btn.classList.add("active");
    });
  });
};

showUser();

$btn.addEventListener("click", showUser);
