import { hacerFetch } from "./utils/fetchUser.js";
import { comportamientoElementos } from "./utils/displayUser.js";
import { mostrarData } from "./utils/mostrarData.js";

(async function () {
    const datos_utiles = await hacerFetch("https://randomuser.me/api/")
    comportamientoElementos(datos_utiles);
    const botones = document.querySelectorAll(".icon")
    mostrarData(botones[4], datos_utiles)
})()