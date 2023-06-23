class Post {
    constructor (id, titulo, body){
        if(typeof(id) == 'number'){
            this.id = id
        } else {
            throw new Error(`Se esperaba un elemento tipo number`)
        } 

        if(typeof(titulo) == 'string'){
            this.titulo = titulo
        } else {
            throw new Error(`Se esperaba un elemento tipo string`)
        } 

        if(typeof(body) == 'string'){
            this.body = body
        } else {
            throw new Error(`Se esperaba un elemento tipo string`)
        }
    }

    ultLetraTitulo (){
        return this.titulo[this.titulo.length - 1]
    }
}

let posteo1 = new Post(1,'Posteo n° 1', 'Este es el posteo n°1')

console.log(posteo1.ultLetraTitulo());

let posteo2 = new Post(2,'Posteo n° 2', 'Este es el posteo n°2')

console.log(posteo2.ultLetraTitulo());