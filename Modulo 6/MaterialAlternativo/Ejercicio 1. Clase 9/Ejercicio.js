/*
  Crear una función que retorne un objeto que almacene un Array y 3 funciones de modificación de datos.
    => Funciones a ejecutarse. DEBEN recibir una Callback que indique el tipo de trabajo
      => Alterar los valores almacenados
      => Filtrar el valor especificado
      => Encontrar el valor especificado. Debe retornar el valor encontrado no un array (puede no recibir una función callback)
    => Las funciones modificadoras NO DEBEN recibir el array como argumento
    => NO DEBEN modificar los valores originales. DEBEN crear una copia y retornarla.
    => Mostrar los resultados en pantalla  
*/

function a() {
  return {
    array: [1, 2, 3, 4, 5, 6],
    alterar: function (cbModificacion) {
      return this.array.map((elemento) => cbModificacion(elemento));
    },
    filtrar: function (cbFiltro) {
      const arr = [];
      for (const elemento of this.array) {
        if (cbFiltro(elemento)) arr.push(elemento);
      }
      return arr;
    },
    encontrar: function (valor) {
      return [this.array.find((elemento) => elemento === valor)]
    },
  };
}


const obj1 = a().alterar( el => el*10)
const obj2 = a().filtrar( el => el % 2 == 0)
const obj3 = a().encontrar(2)


const body = document.getElementsByTagName("body")[0]


const renderizar = (titulo, array) => {
    const title = document.createElement("h3")
    title.innerText = titulo
    
    const lista = document.createElement("ul")
    lista.innerHTML = array.map( elemento => `<li>${elemento}</li>`).join("")
    
    const fragmento = document.createDocumentFragment()
    fragmento.append(titulo,lista)
    body.appendChild(fragmento)
}

renderizar('Array Original', a().array)
renderizar('Alterar', obj1)
renderizar('Filtrar', obj2)
renderizar('Encontrar', obj3)


console.log(a().array)
console.log(obj1)
console.log(obj2)
console.log(obj3)