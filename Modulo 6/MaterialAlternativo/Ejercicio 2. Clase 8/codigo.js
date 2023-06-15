const visor = document.getElementById("result")



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
                observador.accion(value)
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
        },
        start: function (){
            this.notify(this.state)
        },
        clearResult: function(){
            return this.setState({resultado: 0, entrada: [], operador: 'C'})
        },
        addNumberToInput: function (btn){
            return this.setState({entrada: [...this.state.entrada, Number(btn.textContent)]}) 
        },
        actualizar: function (btn){
            if (btn.classList.contains("number")){
                if(!this.state.operador) {
                    this.notify(this.setState({resultado: Number(btn.textContent)}) )
                }
            }
        }
    }
}


function observador (fn){
    return {
        accion: fn
    }
}

const observadorVisor = observador(reaccionVisor)

function reaccionVisor (estado) {
    visor.innerText = estado.resultado
}

stateCalculadora().agregarObservador(observadorVisor)

document.addEventListener("click", e => {
    stateCalculadora().actualizar(e.target)
})



