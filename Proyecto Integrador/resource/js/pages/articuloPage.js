const renderizarPageArticulo = () => {
    const objeto = location.search.substring(location.search-2, location.search-1)
    console.log(objeto)

/*      const plantilla = 
     `<div class="article-details">

        <div class="article-image" style="background-image: url(${objeto.urlImagen});"></div>

        <div class="article-title">
            <h2>${objeto.nombre}</h2>
        </div>

        <p class="article-description">
            ${objeto.descripcion}
        </p>

        <button class="btn btn-success" id="add-to-cart" data-id="${objeto.id}">Agregar al carrito</button>

    </div>`

    const main = document.getElementById("view")
    main.innerHTML = plantilla */
}

renderizarPageArticulo()
