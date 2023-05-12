console.log(history.state);



const updateHistoryView = () => {
    const views = document.querySelectorAll(".history-view")

    views.forEach(view => {
        switch (history.state) {
            case '/home':
                view.innerHTML = 'Estás en Home'
                break
            case '/contact':
                view.innerHTML = 'Estás en Contactos'
                break
        }
    })

}

document.addEventListener("click", e => {
    if(e.target.matches('a')) e.preventDefault();
})