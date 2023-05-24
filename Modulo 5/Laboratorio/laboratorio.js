const count = (array) => new Promise ( res => res(array) )
const sum = (array) => new Promise ( res => res( array.reduce( (a, b) => a + b) )) 
const max = (array) => new Promise( res => res( array.reduce( (previo, actual) => actual > previo ? actual : previo ) ))
const min = (array) => new Promise( res => res( array.reduce( (previo, actual) => actual < previo ? actual : previo ) ))

const lista = [10,200,440,500,0.01]


min(lista)
    .then( resultado => console.log(resultado) )



