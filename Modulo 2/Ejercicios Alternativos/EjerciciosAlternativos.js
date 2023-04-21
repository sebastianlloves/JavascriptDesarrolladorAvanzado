//Modificar el estilo css según el tamaño de pantalla. La pantalla debe cargar con el estilo correspondiente (eventos load y resize)

//Hacer una galería de imágenes

const imagen_central = document.querySelector(".imgCentral")
const imagenes = document.querySelectorAll(".carrusel")
imagen_central.src = imagenes[3].src
let src_imagenes = []
imagenes.forEach(imagen => {
    src_imagenes.push(imagen.src)
});
let contador_imagen = 0
let contador_carrusel = 1
document.addEventListener("click", (e) => {
    if (e.target.matches(".flechaIzquierda")) {
        imagenes.forEach((imagen, index) => {
            if (index + 1 == imagenes.length) {
                imagen.src = imagenes[0].src
            } else {
                imagen.src = imagenes[index + 1].src
            }
        })
        imagen_central.src = imagenes[3].src
    }

    if (e.target.matches(".flechaDerecha")) {
        for (let index = imagenes.length - 1; index > -1 ; index --) {
            if (index == 0) {
                imagenes[index].src = imagenes[imagenes.length - 1].src
            } else {
                imagenes[index].src = imagenes[index - 1].src
            }
        }
        imagen_central.src = imagenes[3].src
    }

    if (e.target.matches("#buttonDinamico")){
        const p = document.getElementById("pDinamico")
        p.textContent = "Cambié el texto"
    }

    if (e.target.matches(".carrusel")){
        const src_imagen = e.target.src
        imagen_central.src = src_imagen
    }
})
console.log(src_imagenes);



//Función que maneja el recorrido de la galeria mediante las flechas

//Escuchas de Evento

//Acceso a Elementos Dinámicos mediante Delegación de Eventos