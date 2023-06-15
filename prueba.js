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

<<<<<<< HEAD
if(Number('+'))console.log('Dió true')
=======
console.log(Array.isArray(obj))

const arr2 = arr1.map(elemento => elemento+1)
console.log(arr2);
>>>>>>> f6a9d798abd9eeb14dfedb926918120a731e4112
