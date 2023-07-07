class KanbanBoard {
    constructor (lista_tareas = [{id: 1, estado: 'pendiente', titulo: 'Auto', descripcion: 'Llevar el auto al mecánico' }]){
        this.tareas = lista_tareas
    }
    renderizar (){
        this.tareas.forEach( tarea => {
            const section = document.getElementById(tarea.estado)
            const divTarea = document.createElement("div")
            divTarea.classList.add("tarea")
            divTarea.classList.add(tarea.estado)
            const titulo = document.createElement("h3")
            titulo.innerText = tarea.titulo
            const texto = document.createElement("p")
            texto.innerText = tarea.descripcion
            divTarea.appendChild(titulo)
            divTarea.appendChild(texto)
            section.append(divTarea)
            divTarea.draggable
        })
    }
    hacerArrastrable (div){
        div.draggable
    }
}

const tablero = new KanbanBoard()
tablero.renderizar()