function fnSuperior (cb){
    const array = [1, 2, 3, 4]
    return cb(array)
}

const valorRec = fnSuperior(elemento => elemento)

console.log(valorRec);

/* function fnSuperior (n1, n2) {
    return function (){
        console.log(n1 + n2);
    }
}

const a = fnSuperior(4,3)() */

