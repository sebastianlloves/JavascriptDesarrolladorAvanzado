const count = (array) => new Promise ( res => res(array) )
const sum = (array) => new Promise ( res => res( array.reduce( (a, b) => a + b) )) 

const lista = [1,2,3,4,5]

sum(lista).
    then(resultado => console.log(resultado))