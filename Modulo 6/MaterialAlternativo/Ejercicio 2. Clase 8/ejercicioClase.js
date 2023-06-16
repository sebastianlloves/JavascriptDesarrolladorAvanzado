/*
  Programación Reactiva
    => Usando la API: https://62633b22c430dc560d2cf4d6.mockapi.io/users
      -> Generar una aplicación que muestre una lista de los nombres de usuario que obtenemos y permita agregar un nuevo nombre de usuario (no es necesario modificar la API).
      -> Los nombres de usuario obtenidos deben almacenarse en un array (state) dentro de un Observable
      -> Para agregar un nuevo nombre de usuario debemos modificar el array (state) creado anteriormente.
      -> Los nuevos nombres de usuario deben agregarse como consecuencia del click de un botón
      -> La vista debe actualizarse cada vez que se modifica el contenido del array (state) -Observador-
*/

const hacerFetch = async function (url){
    try {
        const respuesta = await fetch(url)
        if(!respuesta.ok) throw new Error ('No conectó')
        return await respuesta.json()
    } catch (error){
        console.log(error)
    }
}



// Observable y Obervadores


function observable (){
    return {
        state: {
            usuarios: [1,4]
        },
        observadores: [],
        agregarObservador: function (observador){
            this.observadores.push(observador)
        },
        notificar: function(estado){
            this.observadores.forEach( observador => observador.notificarse(estado) )
        },
        setState: function (newState) {
            for (const key in newState) {
                if (this.state.hasOwnProperty(key)) this.state[key] = newState[key]  
            }
            this.notificar(this.state)
            return this.state
        },
        start: async function (url){
            this.agregarObservador(viewInput)
            this.setState({usuarios: (await hacerFetch(url)).map( obj => obj.userName)})
        },
        agregarUsuario: function (usuario){
            this.notificar(this.setState( {usuarios: [...this.state.usuarios, usuario]} ))
        }
    }
}


function observador (reaccion){
    return {
        notificarse: reaccion
    }
}

const viewInput = observador( estado => {
    renderizar(estado.usuarios)
} )



// Inicializar el proceso


function renderizar (array){
    const vista = `<ul>${array.map( el => `<li>${el}</li>`).join("")}</ul>
    <form id="addUser">
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" id="nombre">
      <br><br>
      <input type="submit" value="Agregar">
    </form>
    `
    const section = document.getElementById("reactiva")
    section.innerHTML = vista
}


const state = observable()

document.addEventListener("DOMContentLoaded", state.start("https://62633b22c430dc560d2cf4d6.mockapi.io/users"))

document.addEventListener("submit", e => {
    e.preventDefault()
    const input = document.getElementById("nombre")
    state.agregarUsuario(input.value)
})







