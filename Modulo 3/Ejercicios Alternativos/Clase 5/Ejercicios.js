const ajax = (url, metodo) => {
    const metodoHTTP = metodo || 'GET'
    const xhr = new XMLHttpRequest()
    xhr.open(metodoHTTP, url)
    xhr.send()
    return xhr
}


const div = document.querySelector("#resultado")

const renderizar = (pagina) => {
    const plantilla = ajax(`${pagina}.html`,'GET')
    plantilla.addEventListener("load", () => {
        if(plantilla.status === 200){
            div.innerHTML = plantilla.response
            history.pushState(pagina,'',pagina)
        } 
        else {
            const error = new Error
            console.log('Hubo error');
        }
        })
    
}

renderizar('home')


document.addEventListener("submit", e => {
    e.preventDefault()

    let base_datos;
    const busqueda = ajax("bd.json")
    busqueda.addEventListener("load", () => {
        if(busqueda.status === 200){
            base_datos = JSON.parse(busqueda.response)
            console.log(base_datos);
            
            const usuario = document.querySelector("#user").value
            const password = document.querySelector("#pass").value
            const user = {user: usuario, pass: password}
        
            for (const user_base of base_datos) {
                if(user_base.user === user.user && user_base.pass === user.pass){
                    renderizar(user_base.role)
                }
                else {
                    div.innerHTML = '<h3>Login incorrecto</h3>'
                    history.pushState('login_invalido','','login_invalido')
                }
            }
                        
            console.log(user);
    } 
    else {
        const error = new Error
        console.log('Hubo error');
    }
    })
    
})

document.addEventListener("click", e => {
    if(e.target.matches("#logOut")){
        e.preventDefault()
        renderizar('home')
    } 
})


window.addEventListener("popstate", e => {
    console.log(e.state);
    renderizar(e.state)
})

