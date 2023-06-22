const vista = document.getElementById("view")

function MostrarArray (array){
    this.arr = array
    this.add = function (valor){
        this.arr.push(valor)
    }
    this.render = function (){
        return `<ul>${this.arr.map( elemento => `<li>${elemento}</li>`).join("")}</ul>`
    }
}


function AgregarDatos (contexto){
    this.render = function () {
        return `
        <form action="">
            <input type="text" name="" id="entrada"><br><br>
            <button type="submit">Agregar</button>
        </form>
        `
    }

/*     this.handleSubmit = function (valor){
        this.add.call(contexto, valor)
    } */

    this.add = function (valor) {
        this.add.call(contexto, valor)
    }

}

const objeto = new MostrarArray([1,2,3,9])
const agregar = new AgregarDatos(objeto)



document.addEventListener("DOMContentLoaded", () => {
    vista.innerHTML = objeto.render()
    vista.innerHTML += agregar.render()
})


document.addEventListener("submit", e => {
    e.preventDefault()
    const input = document.getElementById("entrada")
    agregar.add(input.value);
    vista.innerHTML = objeto.render()
    vista.innerHTML += agregar.render()
})


