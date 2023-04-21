const p = document.createElement("p")
p.textContent = "Creación de elemento dinámico mediante js"
p.id = "pDinamico"

const button = document.createElement("button")
button.textContent = "Cambiar texto"
button.id = "buttonDinamico"

const sectionDinamico = document.getElementById("elemDinamico")
const fragmento = document.createDocumentFragment()
fragmento.appendChild(p)
fragmento.appendChild(button)
sectionDinamico.append(fragmento)