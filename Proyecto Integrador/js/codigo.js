let articulos

window.addEventListener("load", () => {
    const llamada = ajax("bd.json","get")
    llamada.addEventListener("load", () => {
        if(llamada.status === 200){
            articulos = JSON.parse(llamada.response)
            console.log(articulos);
            HomePage()
        } else {
            const error = new Error
            console.log('No cargó los datos');
        }
    })
})

document.addEventListener("submit", e =>{
    e.preventDefault()
    const selector = document.querySelector("#orderBy")
    console.log(selector.value)
    switch (selector.value) {
        case 'menorPrecio':
            articulos.sort((a, b) => a.precio - b.precio)
            break;
        case 'mayorPrecio':
            articulos.sort((a, b) => b.precio - a.precio)
            break;
    }

    const cadena_busqueda = document.querySelector("#search-box").value
    console.log(cadena_busqueda)
      
    generarListadoArticulos(busqueda(cadena_busqueda))

})





// <<===================  Funciones   ===================>>


const ajax = (url, metodo) => {
    const metodoHTTP = metodo || 'GET'
    const xhr = new XMLHttpRequest()
    xhr.open(metodoHTTP, url)
    xhr.send()
    return xhr
}


const GenerarEstructura = () => {
    const main = document.getElementById("view")
    const formulario = document.createElement("form")
    formulario.innerHTML = `
    <div class="index-page">
        <form id="search-form">
            <div><span>Nombre</span><input type="search" id="search-box" class="form-control"></div>
            <div>Ordenar por
                <select name="orderBy" id="orderBy" class="form-control">
                    <option value="nada">-</option>
                    <option value="mayorPrecio">Mayor precio</option>
                    <option value="menorPrecio">Menor precio</option>
                </select>
            </div>
            <button class="btn">Buscar</button>
        </form>
    </div>
    <div id="listado"></div>`
    main.append(formulario)
}


const generarListadoArticulos = array_objetos => {
    let textoHTML = ''
    array_objetos.forEach(objeto => {
        textoHTML +=
            `<div class="article" data-id=${objeto.id}>
                <div class="image" style="background-image: url(${objeto.urlImagen});"></div>
                <div class="content">
                    <div class="article-title">${objeto.nombre}</div>
                    <div class="article-price">
                        <span class="article-price-currency">$</span>
                        <span class="article-price-value">${objeto.precio}</span>
                    </div>
                </div>
            </div>`
    })

    const listado = document.getElementById("listado")
    listado.innerHTML = textoHTML
}

const HomePage = () => {
    GenerarEstructura()
    generarListadoArticulos(articulos)
}


const busqueda = cadena_busqueda => {
    let array_busqueda = articulos.filter(objeto => objeto.nombre.includes(cadena_busqueda) || objeto.nombre.includes(cadena_busqueda.charAt(0).toUpperCase() + cadena_busqueda.slice(1)))
    return array_busqueda
}
