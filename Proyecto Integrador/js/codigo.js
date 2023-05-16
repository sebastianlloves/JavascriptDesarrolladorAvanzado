const ajax = (url, metodo) => {
    const metodoHTTP = metodo || 'GET'
    const xhr = new XMLHttpRequest()
    xhr.open(metodoHTTP, url)
    xhr.send()
    return xhr
}

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
    const articulos_original = [...articulos]
    switch (selector.value) {
        case 'menorPrecio':
            articulos.sort((a, b) => a.precio - b.precio)
            generarListadoArticulos(articulos)
            break;
        case 'mayorPrecio':
            articulos.sort((a, b) => b.precio - a.precio)
            generarListadoArticulos(articulos)
            break;
        case 'nada':
            generarListadoArticulos(articulos_original)
            break
    }
})


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

/* const OrdenarMen_May = () => {

    articulos.sort((a, b) => a.precio - b.precio)
    

}

const OrdenarMay_Men = () => {

    articulos.sort((a, b) => b.precio - a.precio)
    generarListadoArticulos(articulos)

}


const busqueda = cadena_busqueda => {
    let array_busqueda = articulos.filter(objeto => objeto.nombre.includes(cadena_busqueda) || objeto.nombre.includes(cadena_busqueda.charAt(0).toUpperCase() + cadena_busqueda.slice(1)))
    generarListadoArticulos(array_busqueda)
}



busqueda('hand')


document.addEventListener("change", (e) => {
    if (e.target.matches('#orderBy')) {
        if (e.target.value == 'mayorPrecio') OrdenarMay_Men()
        if (e.target.value == 'menorPrecio') OrdenarMen_May()
    }

    if (e.target.matches('#search-box')) {
        busqueda('hand')
    }

})

document.addEventListener("search", (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.matches('#search-box')) {
        busqueda('hand')
    }
    console.log(input.value);
}) */

/* document.addEventListener("search", (e) => {

    if (e.target.matches('#search-box')) {
        e.preventDefault()
        busqueda('hand')
    }
    console.log(input.value);

}) */





