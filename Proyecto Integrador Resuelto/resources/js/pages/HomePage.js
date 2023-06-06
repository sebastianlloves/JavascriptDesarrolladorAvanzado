function HomePage()
{
    const params = new URLSearchParams(location.search);
    let items = articulos;

    if (params.get('q')) {
        items = items.filter((item) => item.nombre.toLowerCase().includes(params.get('q').toLowerCase()))
    }

    if (params.get('s')) { 
        switch(params.get('s'))
        {
            case 'mayorPrecio':
                console.log(items);
                items = items.sort((a, b) => 
                    Number(a.precio) < Number(b.precio) ? 1 : -1
                )
                break;
            case 'menorPrecio':
                items = items.sort((a, b) => 
                    Number(a.precio) > Number(b.precio) ? 1 : -1
                )
                break;
        }
    }

    renderPage('/resources/pages/index.hbs', { articulos: items }, () =>
    {
      document.getElementById('search-form').addEventListener('submit', (e) =>
      {
          e.preventDefault();

          navigate(`/?q=${e.target[0].value}&s=${e.target[1].value}`);
      });
    });
}
