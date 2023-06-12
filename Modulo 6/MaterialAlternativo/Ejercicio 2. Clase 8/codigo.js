

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
        subscribers : [],
        suscribe: function (subscriber){
            this.subscribers.push(subscriber)
        }, 
        notify: function (value) {
            this.subscribers.forEach( subscriber => {
                subscriber.notify(value)
            } )
        },
        setState
    }
}


function setState (newState) {
    const state = this.state
    for (const key in newState) {
        if (state.hasOwnProperty(key)) {
            state[key] = newState[key];
        }
    }
}
