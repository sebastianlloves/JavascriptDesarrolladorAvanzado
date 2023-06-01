/* const listado = [
    { id: 1, nombre: "Carlos" },
    { id: 2, nombre: "Andrea" },
    { id: 3, nombre: "Lorenzo" },
]
  
const registroDeudas = [
    { id: 1, deudas: [{ concepto: "TV", monto: 0 }, { concepto: "TV", monto: 2000 }] },
    { id: 3, deudas: [{ concepto: "TV", monto: 3400 }, { concepto: "Moto", monto: 1000 }]}
]

const obtenerNombre = () => {
    const valor = prompt('Ingrese el nombre a buscar:')
    return valor
}


const buscarID = nombre => {
    let id = false
    for (const usuario of listado) {
        if(usuario.nombre === String(nombre).trim().slice(0,1).toUpperCase()+String(nombre).trim().slice(1,String(nombre).trim().length).toLowerCase()){
            id = usuario.id
            break 
        }  
    }
    console.log(id)
    return id
}

const buscarDeudas = id => {
    let deuda_total = 0
    for (const registro of registroDeudas) {
        if(registro.id == parseInt(id)) {
            registro.deudas.forEach( deuda => deuda_total += deuda.monto )
        }
    }
    return deuda_total
}

const mostrarPantalla = valor => {
    return alert(`La deuda total registrada es de: $ ${valor}.`)
}

const pipe = [buscarID, buscarDeudas, mostrarPantalla]

pipe.reduce( (acumulador, fnActual) => fnActual(acumulador), obtenerNombre())

 */
this.a = 'Seba'
const mostrarThis = () => {
    console.log(this.a)
}

let a2 = {a: 'Pepe', mostrarThis}

mostrarThis()
a2.mostrarThis()
