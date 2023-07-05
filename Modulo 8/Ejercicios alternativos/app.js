import { hacerFetch } from "./utils/fetchUser.js";
import { comportamientoElementos } from "./utils/displayUser.js";
import { mostrarData } from "./utils/mostrarData.js";

async function showUser() {
    let datos_utiles = await hacerFetch("https://randomuser.me/api/")
    comportamientoElementos(datos_utiles);
    document.addEventListener("mouseover", e =>{
        if(e.target.matches(".icon")) mostrarData(e.target, datos_utiles)
    })
    /* document.addEventListener("click", async e => {
        if(e.target.matches(".btn")){
            e.preventDefault()
            datos_utiles = await hacerFetch("https://randomuser.me/api/")
            comportamientoElementos(datos_utiles);
        }
    }) */
}
showUser()

const btn = document.querySelector(".btn")
btn.addEventListener("click", showUser)