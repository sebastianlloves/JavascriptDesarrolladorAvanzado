export async function hacerFetch (url){
    const res = await fetch(url)
    if(!res.ok) throw new Error ("No conectó")
    const random_user = await res.json()
    let {name: obj_nombre, email: correo, dob: {age, date}, location: {street: {number: numero, name: calle}}, phone: telefono, login: {password: contrasena}} = random_user.results[0]
    const direccion = `${numero}, ${calle}.`,
        nombre = `${obj_nombre.title} ${obj_nombre.first} ${obj_nombre.last}`,
        cumple = `${new Date(date).toLocaleDateString()}`
    return {nombre, correo, cumple, direccion, telefono, contrasena}
}