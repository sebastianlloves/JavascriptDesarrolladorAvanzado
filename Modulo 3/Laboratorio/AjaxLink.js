const a = document.querySelectorAll("a.ajax-link")

a.forEach(elemento => {
    elemento.addEventListener("click", (e) => {
        e.preventDefault()
        const xhr = new XMLHttpRequest
        xhr.open("GET", elemento.href)
        xhr.send()
        xhr.addEventListener("load", () => {
            if(xhr.status == 200){
/*                 const html = String(xhr.response).slice(String(xhr.response).indexOf('<div'),String(xhr.response).indexOf('<script')); */
                const divs = document.querySelectorAll("div.ajax-link-target")
                divs.forEach(div => div.innerHTML = xhr.response);
            }
        })
    })
});