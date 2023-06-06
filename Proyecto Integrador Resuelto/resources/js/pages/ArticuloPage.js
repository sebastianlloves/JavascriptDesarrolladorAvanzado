async function ArticuloPage()
{
    const search = new URLSearchParams(location.search);

    if (search.get('id') == null) {
        navigate('/');
        return;
    }

    const data = articulos.find((item) => item.id == search.get('id'))
    
    renderPage('/resources/pages/articulo.hbs', data);

}