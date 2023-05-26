fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
.then( respuesta => {
    if(!respuesta.ok) throw new Error ('No se comunicó')
    return respuesta.json()
})
.then(respuesta => {
    const data_pokemones = respuesta.results
    for (const pokemon of data_pokemones) {
        fetch(pokemon.url)
        .then( respuesta => {
            if(!respuesta.ok) throw new Error ('No encontró la data del pokemon específico')
            return respuesta.json()
        })
        .then( data_pokemon => {
            let obj_pokemon = {
                nombre: pokemon.name,
                url_imagen : data_pokemon.sprites.front_default,
                movimientos : data_pokemon.moves.slice(0,5).map( movimiento => movimiento.move.name)
            }
            renderizarPokemon (obj_pokemon)
        })
    }
})


function renderizarPokemon (obj_pokemon){
    const visualizador = document.querySelector("#visualizador")
    const div_fichaPokemon = document.createElement("div")
    div_fichaPokemon.classList[0] = "ficha_pokemon"
    div_fichaPokemon.innerHTML = 
    `<h3>${obj_pokemon.nombre.toUpperCase()}</h3>
    <img src=${obj_pokemon.url_imagen} alt="">

    <h4>Movimientos</h4>
    <ul>
        ${'<li>'.concat(obj_pokemon.movimientos.join(`</li><li>`)).concat('<\li>')}
    </ul>`

    visualizador.appendChild(div_fichaPokemon)
}

