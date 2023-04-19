/* const navegador = navigator.userAgent

console.log(navegador.length)

const navegadores = ["Firefox", "Chrome", "Safari", "Opera", "Edge"]; */

/* const body = document.getElementsByTagName("body")[0]
for(const nav of navegadores) {
    const p = document.createElement("p")
    p.innerText = nav
    body.append(p)
} */
/* 
const body = document.getElementsByTagName("body")[0]
const p = document.createElement("p")
p.id = "marquesina"
let oracion = ''
p.textContent = oracion


body.append(p)
const frase = 'Mi primer programa en JS'

setInterval(frase.forEach(letra => {
    oracion += letra
    p.textContent = oracion
}),500) */




/* const vengadores = [
    { nombre: "Tony", apellido: "Stark", alias: "Iron-Man" },
    { nombre: "Steve", apellido: "Rogers", alias: "Capitan America" },
    { nombre: "Bruce", apellido: "Banner", alias: "Hulk" },
    { nombre: "Natasha", apellido: "Romanoff", alias: "Black Widow" },
    { nombre: "Clint", apellido: "Barton", alias: "Hawkeye" }]

const select = document.getElementById("menu_desplegable")
let option = document.createElement("option")
option.textContent = "Todos"
option.hasAttribute("selected")
select.append(option)

vengadores.forEach(vengador => {
    let option = document.createElement("option")
    option.textContent = vengador.alias
    select.append(option)
})

function mostrarTodos() {
    let todos_veng = `<hr>`
    vengadores.forEach((vengador, index) => {
        todos_veng += `<strong>Datos del vengador ${index + 1}:</strong><br><br><i>Nombre:</i> ${vengador.nombre}<br><i>Apellido:</i> ${vengador.apellido}<br><i>Alias:</i> ${vengador.alias}<br><hr>`
    })
    parrafo.innerHTML = todos_veng
    leyenda.append(parrafo)
}

window.addEventListener("DOMContentLoaded", mostrarTodos)
const leyenda = document.getElementById("leyenda")
const parrafo = document.createElement("p")
select.addEventListener("change", () => {
    if (select.value == "Todos") {
        mostrarTodos()
    } else {
        const hallado = vengadores.find(vengador => vengador.alias == select.value)
        parrafo.innerHTML = `Datos del vengador seleccionado:<br><br>Nombre: ${hallado.nombre}<br>Apellido: ${hallado.apellido}<br>Alias: ${hallado.alias}`
        leyenda.append(parrafo)
    }
}) */

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const div = document.getElementById("mostrar_numeros")
const body = document.getElementsByTagName("body")[0]


const mostrar_pares = () => {
    const texto = numeros.filter(numero => numero % 2 == 0)
    div.textContent = `La lista de número es: ${texto.join(", ")}.`
    body.appendChild(div)
}

const mostrar_impares = () => {
    const texto = numeros.filter(numero => numero % 2 == 1)
    div.textContent = `La lista de número es: ${texto.join(", ")}.`
    body.appendChild(div)
}

const par = document.getElementById("par")
const impar = document.getElementById("impar")

par.addEventListener("change", mostrar_pares)
impar.addEventListener("change", mostrar_impares)

body.insertAdjacentElement("afterbegin",)





