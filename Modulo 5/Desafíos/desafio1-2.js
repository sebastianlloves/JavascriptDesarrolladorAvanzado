let datos_generales = {}

async function solicitarDatos (url) {
    await hacerFetch(`${url}/users`, 'usuarios')
    await hacerFetch(`${url}/posts`, 'posteos')  
    await hacerFetch(`${url}/comments`, 'comentarios')    
    console.log(datos_generales)

    datos_generales.usuarios.forEach(usuario => {
        obtenerPosts({id: usuario.id, nombre: usuario.name})
    });


}


async function hacerFetch (url, clave) {
    await fetch(url)
    .then( respuesta => {
        if (!respuesta.ok) throw new Error('No se hayó la URL buscada') 
        return respuesta.json()
    })
    .then( respuesta => datos_generales[[clave]] = respuesta)
    .catch(error => console.log(error))
}

function obtenerPosts (objeto){
    if(objeto.id){
        console.log(`El ID del usuario es ${objeto.id} y el nombre es ${objeto.nombre}.`)
        console.log(datos_generales.posteos.filter( posteo => posteo.userId == objeto.id))
    }
}


solicitarDatos('https://jsonplaceholder.typicode.com')