async function respuestaFetch (url) {
    const response = await fetch(url)
    if(!response.ok) throw new Error ('La URL es incorrecta')
    return response.json()
}


async function GetPokemonsArray (url) {
    try{
        const json_pokemones = await respuestaFetch(url);
        const data_pokemones = json_pokemones.results
    
        for (const pokemon of data_pokemones) {
            const data_pokemon = await respuestaFetch(pokemon.url)
            let obj_pokemon = {
                nombre: pokemon.name,
                url_imagen : data_pokemon.sprites.front_default,
                movimientos : data_pokemon.moves.slice(0,5).map( movimiento => movimiento.move.name)
            }
            
            renderizarPokemon (obj_pokemon)
        }
    }
    catch (error) {
        console.log('No se pudo conectar')
    }
}

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


GetPokemonsArray('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')


