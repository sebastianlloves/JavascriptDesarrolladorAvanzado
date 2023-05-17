const circulos = document.querySelectorAll((".circulo"))
circulos.forEach( circulo => circulo.draggable = true)

const drop_zone = document.querySelector("#drop_zone")

document.addEventListener("dragenter", e => {
    e.preventDefault()
    if(e.target.id === 'drop_zone'){
    }
})

document.addEventListener("dragleave", e => {
    e.preventDefault()
    if(e.target.id === 'drop_zone'){
    }
})

document.addEventListener("dragover", e => {
    e.preventDefault()
    if(e.target.id === 'drop_zone'){
    }
})

document.addEventListener("drop", e => {
    e.preventDefault()
    if(e.target.id === 'drop_zone'){
        drop_zone.style.backgroundColor = e.dataTransfer.getData('color_fondo')
        console.log(e);
    }
})


document.addEventListener("dragstart", e => {
    if(e.target.classList[0] === 'circulo'){
        e.dataTransfer.setData('color_fondo', e.target.style.backgroundColor)
    }
})

const input_files = document.querySelector("#archivos")

input_files.addEventListener("change", () => {
    console.log(input_files.files);
})




