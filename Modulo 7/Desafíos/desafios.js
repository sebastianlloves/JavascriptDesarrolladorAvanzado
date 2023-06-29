(async function renderizar (){
    const llamado = await fetch("https://jsonplaceholder.ir/users")
    const articulos = await llamado.json()
    console.log(articulos)

})()

