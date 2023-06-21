function MostrarArray (array){
    return {
        array,
        add: function (valor){
            this.arr.push(valor)
        },
        render: function (){
            const vista = document.getElementById("view")
            vista.innerHTML = `<ul>${this.array.map( elemento => `<li>${elemento}</li>`).join("")}</ul>`
        }
    }
}


function AgregarDatos (){
    return {
        render: function () {
            const formulario = document.createElement("form")
            formulario.innerHTML = `
            <form action="">
                <input type="text" name="" id=""><br><br>
                <button type="submit">Agregar</button>
            </form>
            `
            const vista = document.getElementById("view")
            vista.insertAdjacentElement("afterend", formulario)
        }
    }
}

MostrarArray([1,2,3]).render()
AgregarDatos().render()
