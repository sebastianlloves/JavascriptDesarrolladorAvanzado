/* const inputs = document.querySelectorAll("input")

let states = {}

const Required = (input) => {
    document.addEventListener("focusout", e => {
        if(e.target === input && input.value === '') states[`input_${input.id}`] = false
        else states[`input_${input.id}`] = true
        console.log(states)
    })
}

const reportValidations = () => {

}

inputs.forEach ( input => {
    states[`input_${input.id}`] = false
})

console.log(states); */
/* function funcion (){
    return {nombre:"Seba"}
}

funcion().nombre = 'Pepe'

console.log(funcion().nombre); */

const obj = {nombre: 'Seba'}
const obj1 = obj

obj.nombre = 'Pepe'
console.log(obj);
console.log(obj1);