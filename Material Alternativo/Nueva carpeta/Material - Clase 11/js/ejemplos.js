/*
    Almacenar Elemento
*/

localStorage.setItem("user", JSON.stringify({ nombre: "pepe" }));

/*
    Leer Elemento
*/

const userInStorage = localStorage.getItem("user");
const objUser = JSON.parse(user);
console.log(objUser);

/*
    Eliminar elemento
*/

localStorage.removeItem("user");

/*
    Recorrer localStorage/sessionStorage
*/

localStorage.setItem("dato1", "uno");
localStorage.setItem("dato2", "dos");
localStorage.setItem("dato3", "tres");

//Generar un Array con las claves del Objeto Storage
const clavesStorage = Object.keys(localStorage);

//Recorrer el Array y mostrar los valores
for (const clave of clavesStorage) {
  console.log(`${clave}: ${localStorage.getItem(clave)}`);
}

/*
    Eliminar todo
*/
localStorage.clear();
