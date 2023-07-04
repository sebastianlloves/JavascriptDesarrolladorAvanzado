(async function renderizar (){
    try {
        const llamado = await fetch("https://jsonplaceholder.ir/users")
        const articulos = await llamado.json()
        console.log(articulos)

        const view = document.getElementById("view")
        const textoHTML = articulos.map( articulo =>
             `
            <div>
                <ul>
                    <li>Nombre: ${articulo.name}</li>
                    <li>Id: ${articulo.id}</li>
                    <li>Email: ${articulo.email}</li>
                </ul>
            </div>
            `
        )
        
        view.innerHTML = textoHTML.join("")

    } catch (error) {
        console.log('Errooooooooooooooooor')
    }

})()

