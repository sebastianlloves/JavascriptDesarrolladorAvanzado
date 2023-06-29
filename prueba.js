/* function mostrarThis (){
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

const arr2 = arr1.map(elemento => {
    if(elemento == 2) {
       return elemento
    }
})
console.log(arr2); */


/* const keys = ['1nombre y apellido', 'edad']

const a = {}
keys.forEach(key => a[key] = key)
console.log(a);
delete a['1nombre y apellido']
console.log('1nombre y apellido' in a) */


const obj = {}
obj.edad = 24
Object.defineProperty(obj, 'nombre', {
    configurable: false,
    writable: false,
    value: 'Seba'
})

delete obj.nombre
obj.edad = 'Pepe'


console.log(obj);
console.log('1nombre y apellido' in a)

const b=2,
    c=4,
    d='a'

console.log(b);
console.log(c);
console.log(d); 


/* let a = 0
let b = '2'

typeof(a) !== 'number' ? console.log(`a NO es número`) : 
    (typeof(b) !== 'number' ? (console.log(`a ES número`), console.log(`b NO es número`)) : (console.log(`a ES número`), console.log(`b ES número`))) */


/* a &&= 'a existe'
console.log(a) */

const nota = '1'
let aprobado

switch (nota) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 'En Proceso':
      aprobado = false;
      break;
    default:
      aprobado = true;
}

console.log(aprobado);
