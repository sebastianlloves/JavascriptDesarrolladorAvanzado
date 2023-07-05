import { hacerFetch } from "./utils/fetchUser.js";
import { comportamientoElementos } from "./utils/displayUser.js";

(async function () {
    const datos_utiles = await hacerFetch("https://randomuser.me/api/")
    comportamientoElementos(datos_utiles);
})()