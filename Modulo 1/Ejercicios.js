
const vengadores = [
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

const leyenda = document.getElementById("leyenda")
const parrafo = document.createElement("p")
select.addEventListener("change", () => {
    if (select.value == "Todos") {
        let todos_veng = `<hr>`
        vengadores.forEach( (vengador, index) => {
            todos_veng += `<strong>Datos del vengador ${index + 1}:</strong><br><br><i>Nombre:</i> ${vengador.nombre}<br><i>Apellido:</i> ${vengador.apellido}<br><i>Alias:</i> ${vengador.alias}<br><hr>`
        })
        parrafo.innerHTML = todos_veng
        leyenda.append(parrafo)
    } else {
        const hallado = vengadores.find(vengador => vengador.alias == select.value)
        parrafo.innerHTML = `Datos del vengador seleccionado:<br><br>Nombre: ${hallado.nombre}<br>Apellido: ${hallado.apellido}<br>Alias: ${hallado.alias}`
        leyenda.append(parrafo)
    }
})



