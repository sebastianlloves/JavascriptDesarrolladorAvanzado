function crearIterable (array){
    this.array = array
    this.i = 0
    this.first = () => this.array[0]
    this.last = () => this.array[this.array.length - 1]
    this.next = () => {
        this.i ++
        return {value: this.array[this.i], done: !this.hasNext()}
    }
    this.back = () => {
        this.i --
        return {value: this.array[this.i], done: !this.hasNext()}
    }
    this.hasNext = () => this.i + 1 < this.array.length
    this.reset = () => this.i = 0
    this.finish = () => this.i = this.array.length - 1
    this.actInd = src => {
        this.array.forEach( (elemento, indice) => {
            if(elemento.src == src) this.i = indice                        
        });
    }

    return {
        first,
        last, 
        next,
        back,
        hasNext,
        reset, 
        finish,
        actInd
    }
}

const imagenes = crearIterable(document.querySelectorAll(".carrusel"))
const img_central = document.getElementsByClassName("imgCentral")[0]

document.addEventListener("click", e => {
    if(e.target.matches(".flecha")){
        if(e.target.matches(".flechaDerecha")){
            if(imagenes.hasNext()) img_central.src = imagenes.next().value.src
            else {
                imagenes.reset()
                img_central.src = imagenes.first().src
            }
        }

        if(e.target.matches(".flechaIzquierda")){
            if(img_central.src != imagenes.first().src)img_central.src = imagenes.back().value.src
            else {
                imagenes.finish()            
                img_central.src = imagenes.last().src
            }
        }
    }

    if(e.target.matches(".carrusel")){
        img_central.src = e.target.src
        imagenes.actInd(e.target.src)
    }
})
