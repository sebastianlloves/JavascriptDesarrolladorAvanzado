
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