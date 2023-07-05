export function mostrarData(boton, data){
    const titulo = document.querySelector(".user-title")
    const texto = document.querySelector(".user-value")
    const etiqueta = boton.dataset.label

    titulo.innerText = `My ${etiqueta} is:`
    texto.innerText = data[etiqueta]
}