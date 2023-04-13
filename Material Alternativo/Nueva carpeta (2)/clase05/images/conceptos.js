/*
    Destructuración
*/

const evento = {
  bubble: true,
  target: {
    name: "algo",
    id: "idTarget",
  },
};

const idTarget = evento.target.id;
console.log(idTarget);

const { target, bubble } = evento;
console.log(target);
console.log(bubble);

const {
  target: { id },
} = evento;
console.log(id);

const colores = ["Rojo", "Amarillo", "Verde"];
const [valor1, valor2, valor3] = colores;
console.log(valor1, valor2, valor3);

/*
    Spread Operator
*/

const objOriginal = {
  nombre: "Pepe",
};

/* const copia = objOriginal; //Si queres saber qué hay en copia, mira qué hay en objOriginal
copia.dni = 44444;
console.log(objOriginal);
console.log(copia); */

/* const copia = {...objOriginal};
copia.dni = 4444444;
console.log(copia);
console.log(objOriginal); */
const copia = { ...objOriginal, dni: 444444 };
console.log(copia);
console.log(objOriginal);

/* const arrOriginal = [1, 2, 3];
const arrCopia = [...arrOriginal];
arrCopia.push(4)
console.log(arrCopia);
console.log(arrOriginal); */
const arrOriginal = [1, 2, 3];
const arrCopia = [...arrOriginal, 4];
console.log(arrCopia);
console.log(arrOriginal);
