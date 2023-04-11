let AlmacenamientoTareas = []

const AgregarTarea = function (tarea) {
    AlmacenamientoTareas.push(tarea)
}

const EditarTarea = function (texto_viejo, texto_nuevo) {
    let indiceTarea = AlmacenamientoTareas.findIndex(texto_viejo)
    AlmacenamientoTareas[indiceTarea] = texto_nuevo
}

const BorrarTarea = function (texto) {
    let indiceTarea = AlmacenamientoTareas.findIndex(texto)
    AlmacenamientoTareas.splice(indice_tarea, 1)
}

let ReporteTodasTareas = function () {
    let reporte = AlmacenamientoTareas.join(', ')
    return AlmacenamientoTareas
}

let ReporteTareasEnCurso = function () {
    let tareasEnCurso = AlmacenamientoTareas.filter(function(item){
        return item.estado == 'En curso'}).texto
    return tareasEnCurso.join()
}

let ReporteTareasPendientes = function () {
    let reporte = ''
    for (let i = 0; i < AlmacenamientoTareas.length; i++) {
        if (AlmacenamientoTareas[i].estado == 'pendiente') {
            reporte = AlmacenamientoTareas[i] + ' ';
        }
    }
    return reporte
}

let ReporteTareasTerminadas = function () {
    let reporte = ''
    for (let i = 0; i < AlmacenamientoTareas.length; i++) {
        if (AlmacenamientoTareas[i].estado == 'terminada') {
            reporte = AlmacenamientoTareas[i] + ' ';
        }
    }
    return reporte
}

AlmacenamientoTareas = [{texto: '1', estado: 'En curso'}, {texto: '2', estado: 'En curso'}, {texto: '3', estado: 'Pendiente'}, {texto: '4', estado: 'Terminada'}, {texto: '5', estado: 'Terminada'}, {texto: '6', estado: 'Pendiente'}]

console.log(ReporteTareasEnCurso())
