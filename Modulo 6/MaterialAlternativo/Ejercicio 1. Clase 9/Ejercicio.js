function a (){
    return {
        array,
        alterar: function (cbModificacion){
            return this.array.map( elemento => cbModificacion(elemento))
        },
        filtrar: function ()
    }
}