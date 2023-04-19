let CampoRequerido = (idElemento) => {
    let isValid = false
    const elemento = document.getElementById(idElemento)
    elemento.addEventListener('blur',() => {
        isValid = elemento.value.length > 0
    })
    
    return idElemento
}

let elemento = 4
let prueba = elemento > 3
console.log(prueba);