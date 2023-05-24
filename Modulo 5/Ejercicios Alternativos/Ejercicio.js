async function respuestaFetch (url) {
    const response = await fetch(url)
    if(!response.ok) throw new Error ('La URL es incorrecta')
    return response.json()
}



async function loguear () {
/*     const data_general = await respuestaFetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
    const array_pokemones = data_general.results
    array_pokemones.forEach(pokemon => {
        const data_pokemon = respuestaFetch(pokemon.url)    
    }) */
    console.log(respuestaFetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'))
    console.log(await respuestaFetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'))
}

respuestaFetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')

loguear()

/* const array = []
array.push(1,2,3,4)
console.log(array); */