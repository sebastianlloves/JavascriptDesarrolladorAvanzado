const boton = document.getElementById("btn")
const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const comentarios = document.getElementById("comentarios")
const formulario = document.getElementById("formulario")


const h3 = document.createElement("h3")
h3.style.color = "red"
formulario.insertAdjacentElement("afterbegin", h3)
h3.innerText = ''



/* 
const span_usuario = document.getElementById("sp_usuario")
span_usuario.style.color = "red"
const span_contrasena = document.getElementById("sp_contrasena")
span_contrasena.style.color = "red"
const span_comentarios = document.getElementById("sp_comentarios")
span_comentarios.style.color = "red"

const regExp_usuario = /[0-9]/g
let usuario_valido = false
const regExp_email = /[0-9]/g
let email_valido = false

document.addEventListener("input", (e) => {
    if (e.target.matches("#usuario")) {
        e.preventDefault()
        const valor = usuario.value
        if ( regExp_usuario.test(valor) ) {
            span_usuario.innerText = '    El nombre de usuario no puede contener números'
            usuario_valido = false
        } else {
            span_usuario.innerText = ''
            usuario_valido = true
        }
    console.log(usuario_valido);
    }

    
}) 
 */

const inputs = document.querySelectorAll('#formulario input,#formulario textarea')
let usuario_valido = false;
let email_valido = false;
let comentarios_valido = false;
console.log(inputs);

document.addEventListener("input", (e) => {
    inputs.forEach(input => {
        let span = document.getElementById(`span_${input.id}`)
        if (!span) {
            span = document.createElement("span")
            span.id = (`span_${input.id}`)
            input.insertAdjacentElement("afterend", span)
        }
    })


    if (e.target.id === 'usuario') {
        if (/[0-9]/g.test(e.target.value)) {
            document.getElementById(`span_${e.target.id}`).innerText = ` El campo no puede inlcuir numeros`
            usuario_valido = false
        } else if (e.target.value == '') {
            document.getElementById(`span_${e.target.id}`).innerText = ` Este campo es obligatorio`
            usuario_valido = false
        } else {
            document.getElementById(`span_${e.target.id}`).innerText = ``
            usuario_valido = true
        }
    }

    if (e.target.id === 'email') {
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(e.target.value)) {
            document.getElementById(`span_${e.target.id}`).innerText = ` Debe ingresar un mail válido`
            email_valido = false
        } else {
            document.getElementById(`span_${e.target.id}`).innerText = ``
            email_valido = true
        }
        if (e.target.value == '') {
            document.getElementById(`span_${e.target.id}`).innerText = ` Este campo es obligatorio`
            email_valido = false
        }
    }

    if (e.target.id === 'comentarios') {
        if (!(/^.{0,150}$/g).test(e.target.value)) {
            document.getElementById(`span_${e.target.id}`).innerText = ` El comentario es demasiado largo`
            comentarios_valido = false
        } else {
            document.getElementById(`span_${e.target.id}`).innerText = ``
            comentarios_valido = true
        }
    }


    console.log(`Usuario válido: ${usuario_valido}`);
    console.log(`Mail válido: ${email_valido}`);
    console.log(`Comentarios válido: ${comentarios_valido}`);
})

document.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.matches("#btn")) {
        if (usuario.value == '' || contrasena.value == '' || comentarios.value == '') {
            h3.innerText = 'Debe completar todos los campos para poder enviar el formulario'
        }else if ( !usuario_valido || !email_valido || !comentarios_valido) {
            h3.style.color = "red"
            h3.innerText = 'Revise los campos'
        } else {
            h3.style.color = "green"
            h3.innerText = 'El formulario se ha enviado correctamente'
        }
    }
})


