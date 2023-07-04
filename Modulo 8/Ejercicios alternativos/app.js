import { hacerFetch } from "./utils/fetchUser.js";

(async function () {
    const datos_utiles = await hacerFetch("https://randomuser.me/api/")
    console.log(datos_utiles);
    /* let {name: obj_nombre, email, dob: {age, date: cumple}, location: {street: {number: numero, name: calle}}, phone, login: {password: contrasena}} = random_user.results[0]
    console.log(obj_nombre, email, cumple, `${numero}, ${calle}`, phone, contrasena); */
})()