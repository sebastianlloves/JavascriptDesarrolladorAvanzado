async function solicitarDatos (url) {
    const objeto = await hacerFetch(`${url}/users`)
    console.log(objeto);
    
    console.log('segundo');
}


async function hacerFetch (url) {
    fetch(url)
    .then( respuesta => {
        if (!respuesta.ok) throw new Error('No se hayó la URL buscada') 
        return respuesta.json()
    })
    .catch(error => console.log(error))
}


solicitarDatos('https://jsonplaceholder.ir')