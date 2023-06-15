function mostrarThis (){
    console.log(this);
}
const obj = {a: mostrarThis, b: 'Hola', c: prueba}

function prueba (){
    mostrarThis()
}

prueba()
mostrarThis()
obj.a()
obj.c.apply(obj)

const arr1 = [1,2]

const [f,g] = arr1

console.log(arr1);
console.log(f,g);

console.log(Array.isArray(obj))

const arr2 = arr1.map(elemento => elemento+1)
console.log(arr2);
