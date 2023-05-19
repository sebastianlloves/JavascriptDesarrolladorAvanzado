document.addEventListener("dragover", e => {
    if(e.target.id === 'label_archivo') {
        e.preventDefault()
    }
})

document.addEventListener("drop", e => {
    if(e.target.id === 'label_archivo') {
        e.preventDefault()
        const archivo = e.dataTransfer.files[0]
        const ext = archivo.name.split(".")[archivo.name.split(".").length - 1]
        if ( ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp' ){
            const url_archivo = URL.createObjectURL(archivo)
            const getArchivo = ajax(url_archivo)
            getArchivo.addEventListener("load", () => {
                if( getArchivo.status === 200 ){
                    const visualizador = document.querySelector('#visualizador')
                    visualizador.src = url_archivo 
                    console.log(getArchivo.response)
                } else {
                    console.log('Eror')
                }
            })

        } else {
            console.log('No es un formato de archivo válido')
        }
        
    }
})


function ajax (url, metodo) {
    const metodoHTTP = metodo || "GET"
    const xhr = new XMLHttpRequest()
    xhr.open(metodoHTTP, url)
    xhr.send()
    return xhr
}