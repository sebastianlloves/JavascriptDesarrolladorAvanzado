


//Export 

//scriptExport.js

let _privada = `Al no agregar la palabra reservada export, esta variable sólo
                es accesible en fichero actual`;

const publica = () =>{
    console.log(`Agregando export estamos permitiendo que se importe esta
                función desde otro modulo`);
} //Crea un módulo con el nombre publica


export { publica };




