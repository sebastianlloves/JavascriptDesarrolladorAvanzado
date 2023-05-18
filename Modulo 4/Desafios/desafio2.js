// < ========= Ejercicio 2 ============= >

const drop_input = document.querySelector("#drop_input")
const input_files = document.querySelector("#archivos")


document.addEventListener("dragover", e => {
    e.preventDefault()
    if(e.target.id === 'drop_input'){
        console.log('Está encima');
    }
})

document.addEventListener("drop", e => {
    e.preventDefault()
    if(e.target.id === 'drop_input'){
        const archivo = e.dataTransfer.files[0]
        if(archivo.name.split(".")[archivo.name.split(".").length - 1] === 'csv'){
            const url_archivo = URL.createObjectURL(archivo)
            const archivo_plano = ajax(url_archivo,"GET")
            archivo_plano.addEventListener("load", () => {
                if(archivo_plano.status === 200){
                    let array_objetos = []
                    archivo_plano.response.split(/\r\n/).forEach( array_doble => {
                        const array_dividido = array_doble.split(",")
                        array_objetos.push({[array_dividido[0]]: array_dividido[1]})                        
                    })
                    console.log(array_objetos);
                    array_objetos.forEach( objeto => console.log(objeto))
                }
            })
        } else {
            window.alert('El archivo selecionado no es de formato CSV')
        }
    }
})

function ajax (url, metodo) {
    const metodoHTTP = metodo || "GET"
    const xhr = new XMLHttpRequest
    xhr.open(metodoHTTP, url)
    xhr.send()
    return xhr
}

