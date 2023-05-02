const boton = document.getElementById("btn")
const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const comentarios = document.getElementById("comentarios")
const formulario = document.getElementById("formulario")


const h3 = document.createElement("h3")
h3.style.color = "red"
formulario.insertAdjacentElement("afterbegin", h3)
h3.innerText = ''



document.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.matches("#btn")) {
        if (usuario.value == '' || contraseña.value == '' || comentarios.value == '') {
            h3.innerText = 'Debe completar todos los campos para poder enviar el formulario'
        } else {
            h3.style.color = "green"
            h3.innerText = 'El formulario se ha enviado correctamente'
        }
    }
})
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
console.log(inputs);
console.log(/[0-9]/g.test(usuario.value));

document.addEventListener("input", (e) => {
    inputs.forEach(input => {
        if (e.target.id === 'usuario' && /[0-9]/g.test(input.value)) {
            const span = document.createElement("span")
            span.id = (`span_${input.id}`)
            span.innerText = `El campo no puede inlcuir numeros`
            usuario.insertAdjacentElement("afterend", span)
            console.log(`Entró`)
        }
    })

})



