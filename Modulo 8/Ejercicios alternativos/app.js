import { hacerFetch } from "./utils/fetchUser.js";
import { comportamientoElementos } from "./utils/displayUser.js";
import { mostrarData } from "./utils/mostrarData.js";

const btn = document.querySelector(".btn")
let datos_utiles

async function showUser(e = {target: btn}, aprovechar_local) {
    if(e.target.matches(".btn")){
        // localStorage.clear()
        if(Object.keys(localStorage).includes('data') && aprovechar_local) datos_utiles = JSON.parse(localStorage.getItem("data")) 
        else {
            datos_utiles = await hacerFetch("https://randomuser.me/api/")
            localStorage.setItem("data", JSON.stringify(datos_utiles))
        }
        
        comportamientoElementos(datos_utiles);
        document.addEventListener("mouseover", e =>{
            if(e.target.matches(".icon")) mostrarData(e.target, datos_utiles)        
        })
        console.log(localStorage)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showUser( undefined, true)
})

document.addEventListener("click", e => {
    showUser(e, false)
})
