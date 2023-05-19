console.log( ( 2 + 4 ) * 3 - 2 )
console.log( ( 2 + 4 ) + 3 + 2 )
console.log( ( 2 + 4 ) * 4 - 4 )

const sumar = (n1, n2) => n1 + n2
const multiplicar = (n1, n2) => n1 * n2
const restar = (n1, n2) => n1 - n2

const numeros = [2, 4, 3, 2]
const arrFunciones = [sumar, multiplicar, restar]

const suma_todos = numeros.reduce( (resultado, valor_actual ) =>  resultado + valor_actual )
console.log( suma_todos )

const operaciones_unicoValor = arrFunciones.reduce( function(resultado, fnActual, index) {
    return fnActual(resultado, numeros[index + 1])
} , numeros[0] )

console.log(operaciones_unicoValor);


const alumno = [['matematica', 5], ['Lengua', 8], ['Geografia', 2]]

const desaprobadas = alumno.reduce( (leyenda_desaprobadas, materiaActual) => {
    /* if(materiaActual[1] < 6)  */return leyenda_desaprobadas.concat(materiaActual[0])
})

console.log(desaprobadas);

