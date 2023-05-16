console.log(history.state);



const updateHistoryView = () => {
    const views = document.querySelectorAll(".history-view")

    views.forEach(view => {
        switch (history.state.split("/")[3]) {
            case 'home':
                view.innerHTML = 'Estás en Home'
                break
            case 'contact':
                view.innerHTML = 'Estás en Contactos'
                break
            default:
                console.log('No funcó');
        }
    })
}

window.addEventListener("popstate", ()=> {
    updateHistoryView()
})

/* document.addEventListener("click", e => {
    if(e.target.matches('a')) e.preventDefault();
}) */

const a = document.querySelectorAll("a.history-link")

a.forEach( a => {
    a.addEventListener("click", e => {
        e.preventDefault()
        history.pushState(a.href,"",a.href)
        updateHistoryView()
        console.log(history.state.split("/")[3])
    })
})