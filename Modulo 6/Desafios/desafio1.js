const inputs = document.querySelectorAll("input")

let states = {}


inputs.forEach ( input => {
    states[`input_${input.id}`] = false
})

const Required = (input) => {
    // states[input.id] 
    document.addEventListener("focusout", e => {
        if(e.target == input && input.value == '') states[`input_${input.id}`] = false
        else states[`input_${input.id}`] = true
        console.log(states)
    })
}

