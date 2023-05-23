async function loguear (mensaje) {
    let mens =  await setTimeout(() => {
        return mensaje
    }, 0)
    return mens
}

console.log( loguear('primero'))
console.log('segundo');