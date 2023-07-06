import { hacerFetch } from "./utils/fetchUser.js";
import { comportamientoElementos } from "./utils/displayUser.js";
import { mostrarData } from "./utils/mostrarData.js";

const btn = document.querySelector(".btn")
let datos_utiles

async function showUser(e = {target: btn}) {
    if(e.target.matches(".btn")){
        datos_utiles = await hacerFetch("https://randomuser.me/api/")
        comportamientoElementos(datos_utiles);
        document.addEventListener("mouseover", e =>{
            if(e.target.matches(".icon")) mostrarData(e.target, datos_utiles)        
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showUser()
})

document.addEventListener("click", e => {
    showUser(e)
})