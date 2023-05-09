const xhr = new XMLHttpRequest
xhr.open("GET", '../datos.json')
xhr.responseType = "json"
xhr.send()
xhr.addEventListener("load", () => {
    if(xhr.status === 200){
        console.log(xhr.response);
    }
})
