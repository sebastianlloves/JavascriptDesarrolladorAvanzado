function renderPage(url, data = {}, onLoad = null)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', () =>
    {
        const template = Handlebars.compile(xhr.response);
        document.getElementById("view").innerHTML = template(data);
        onLoad();
    });
}

function navigate(to)
{
    history.pushState({}, '', to);
    return routes[location.pathname]();
}