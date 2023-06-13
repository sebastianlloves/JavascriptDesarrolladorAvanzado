

const visor = document.getElementById("result")
visor.innerText = 0


const numeros = document.querySelectorAll(".number")

numeros.forEach( boton => console.log(Number(boton.innerHTML)) )

function stateCalculadora () {
    return {
        state: {
            resultado: 0,
            entrada: [],
            operador : ''
        },
        observadores : [],
    agregarObservador: function (observador){
            this.observadores.push(observador)
        }, 
        notify: function (value) {
            this.observadores.forEach( observador => {
                observador.notify(value)
            } )
        },
        setState: function (nuevoState){
            const stateActual = this.state
            for (const key in nuevoState) {
                if (stateActual.hasOwnProperty(key)) {
                    stateActual[key] = nuevoState[key]                    
                }
            }
            return stateActual
        }

    }
}


