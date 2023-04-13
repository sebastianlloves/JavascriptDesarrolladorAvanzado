import "./style.css";
import { setupCounter } from "./utils/counter.js";
import { Home } from "./components/Home.js";

const $app = document.querySelector("#app");
$app.innerHTML = Home();

const $btn = document.querySelector("#counter");
setupCounter($btn);
