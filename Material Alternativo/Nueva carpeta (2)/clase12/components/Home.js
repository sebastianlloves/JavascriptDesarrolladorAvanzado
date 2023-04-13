import view from "./Home.html?raw";
import javascriptLogo from "../javascript.svg";
//import { setupCounter } from "../utils/counter.js";

export const Home = () => {
  const viewWithImage = view.replace("javascriptLogo", `${javascriptLogo}`);
  /* const $btn = document.querySelector("#counter");
  setupCounter($btn); */
  return viewWithImage;
};
