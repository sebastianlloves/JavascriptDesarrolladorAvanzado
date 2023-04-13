//Elementos del HTML
const form = document.querySelector("form");

//Validar valores ingresados
form.addEventListener("change", (e) => {
  //console.log(e);
  const inputs = document.querySelectorAll("#registro input");
  //console.log(inputs);

  inputs.forEach((input) => {
    //Si el elemento actual en recorrido es el input que cambió
    if (e.target === input) {
      //Tomar el span del error
      let span = document.querySelector(`#${input.id}Span`);

      if (!span) {
        //Creación del span que no existe
        const spanVirtual = document.createElement("span");
        spanVirtual.id = `${input.id}Span`;
        spanVirtual.classList.add("error", "none");
        spanVirtual.textContent = input.title;
        span = spanVirtual;
        input.insertAdjacentElement("afterend", span);
      }

      //Validaciones
      let validacion;
      switch (input.id) {
        case "user":
          validacion = input.value.trim().match(/^[A-z\d]+$/g);
          break;
        case "emailRegistro":
          validacion = input.value.trim().match(/[-.\w]+@([\w-]+\.)+[\w-]+/g);
          break;
        case "emailRepetir":
          const mail = document.getElementById("#emailRegistro");
          validacion = input.value.trim() === mail.value.trim();
          break;
        case "pass":
          validacion = input.value
            .trim()
            .match(
              /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[$@!_¡?])[A-z\d$@!_¡?]{8,16}$/g
            );
          break;
        case "passRepetir":
          const pass = document.getElementById("pass");
          validacion = input.value.trim() === pass.value.trim();
          break;
      }

      if (span.textContent !== input.title) span.textContent = input.title;

      (validacion === null || validacion === false) &&
      (input.value !== "" || input.value.includes(" "))
        ? span.classList.remove("none")
        : span.classList.add("none");
    }
  });
});

//validar campos obligatorios
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("#registro input");

  inputs.forEach((input) => {
    //Tomar el span del error
    let span = document.querySelector(`#${input.id}Span`);

    if (!span) {
      //Creación del span que no existe
      const spanVirtual = document.createElement("span");
      spanVirtual.id = `${input.id}Span`;
      spanVirtual.classList.add("error", "none");
      spanVirtual.textContent = "Campo Requerido";
      span = spanVirtual;
      input.insertAdjacentElement("afterend", span);
    }

    if (span.textContent !== "Campo Requerido")
      span.textContent = "Campo Requerido";

    if (input.value === "") span.classList.remove("none");
  });
});
