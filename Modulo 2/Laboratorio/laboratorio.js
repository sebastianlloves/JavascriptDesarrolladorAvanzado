let Validator = {}

let campos = { id1: false, id2: false }

Validator.state = campos

let funciones = [function1, function2]

function function1() {
    console.log('pep');
}
function function2() {
    console.log('fpep');
}

Validator.suscribers = funciones

Validator.updateState = (id, boolean) => {
    Validator.state[id] = boolean
    Validator.suscribers.forEach(funcion => funcion())
}

Validator.updateState('id1', true)
Validator.updateState('id2', false)

Validator.suscribe = funcionNueva => Validator.suscribers.push(funcionNueva)

Validator.isValid = () => {
    let esValido = true
    for (const id in Validator.state) {
        if (Validator.state[id] === false) {
            esValido = false
            break
        };
    }
    return esValido
}

function funcionEjemplo (){
    return 'a'
}

Validator.suscribe(funcionEjemplo)
console.log(Validator);

console.log(Validator.isValid());
