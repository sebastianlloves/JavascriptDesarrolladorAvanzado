export async function hacerFetch (url){
    const res = await fetch(url)
    if(!res.ok) throw new Error ("No conectó")
    const random_user = await res.json()
    let {name: obj_nombre, email, dob: {age, date}, location: {street: {number: numero, name: calle}}, phone, login: {password}, picture:{large: src_imagen}} = random_user.results[0]
    const street = `${numero}, ${calle}.`,
        name = `${obj_nombre.title} ${obj_nombre.first} ${obj_nombre.last}`,
        birthday = `${new Date(date).toLocaleDateString()}`
    return {name, email, birthday, street, phone, password, src_imagen}
}