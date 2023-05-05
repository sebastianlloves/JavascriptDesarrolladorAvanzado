
const div = document.getElementById("colores")
div.style.width = "100px"
div.style.height = "100px"
div.style.display = "flex"
div.style.justifyContent = "center"
div.style.alignItems = "center"

const colores = ["red", "yellow", "green"];
let segundero = 1500

for (const color of colores) {
    cambiarDiv(color, segundero)
    segundero += 1500
}


function cambiarDiv(color, tiempo) {
    setTimeout(() => {
        div.innerHTML = color
        div.style.backgroundColor = color
    }, tiempo)
}


const h3 = document.createElement("h3")
document.querySelector("form").insertAdjacentElement("afterend",h3)

document.addEventListener("submit", (e) => {
    e.preventDefault()

    const xhr = new XMLHttpRequest()
    xhr.open('get','../../../Material Alternativo/Nueva carpeta/Material - Clase 04/bd.json')
    xhr.send()

    xhr.addEventListener("load", () => {
        
        let usuario_valido = false
        if( xhr.status == 200){
            const respuesta = JSON.parse(xhr.response)

            const entrada_usuario = document.querySelector("#usuario").value
            const entrada_password = document.querySelector("#password").value

            for (const objeto of respuesta) {
                if( entrada_usuario == objeto.user && entrada_password == objeto.pass ) usuario_valido = true
            }
        }

        usuario_valido? h3.innerText = 'Es un usuario válido' :  h3.innerText = 'NO es un usuario válido' 
    })
})

