import { home, generateUser } from "./components/home";

document.querySelector("#app").innerHTML = home();

//Fetch Inicial
generateUser();

//Listener del botón fetch
const $btn = document.querySelector(".btn");
$btn.addEventListener("click", generateUser);
