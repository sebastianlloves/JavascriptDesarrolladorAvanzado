export function comportamientoElementos(data) {
    document.querySelector(".user-img").src = data.src_imagen
    document.querySelector(".user-title").innerText = `My name is:`
    document.querySelector(".user-value").innerText = data.name
}