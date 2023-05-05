// Destructurar Objetos

const evento = {
    target: {
        name: "seba",
        id: 4
    },
    bubble: true
}

console.log(evento.target.id);

const { bubble, target } = evento

console.log(target);

// Destructurar Arrays

const colores = ['Rojo', 'Amarillo', 'Verde']

console.log(colores[2]);

const [c, b] = colores

console.log(c);

// Spread Operator Arrays

const original = [1, 2, 3]
const copia = [...original,4]

original.push(5)
console.log(original)
console.log(copia);

//  Spread Operator Objetos

const origin = {
    target: {
        name: "seba",
        id: 4
    },
    bubble: true
}

const cop = {...origin, valor:37}

console.log(origin)
console.log(cop);