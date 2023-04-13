const main = document.querySelector("main");
const url = "https://62633b22c430dc560d2cf4d6.mockapi.io/harryPotter";
const ajax = helpHttp();
//Datos actuales
let data = [];

//Valores iniciales de los inputs
const initialValues = {
  id: null,
  name: "",
  house: "",
};

//Valores actuales de los input
let values = {};

//Funciones Callback
const handleChange = (e) => {
  values = {
    ...values,
    [e.target.name]: e.target.value,
  };
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (values.id) {
    //Actualizar vista
    const form = vistaForm();
    const spinner = vistaSpinner();
    main.innerHTML = form + spinner;

    const ENDPOINT = `${url}/${values.id}`;
    const options = {
      body: values,
      headers: {
        "Content-Type": "application/json",
      },
    };

    ajax
      .put(ENDPOINT, options)
      .then((res) => {
        //Actualizar Array
        data = data.map((el) => (el.id === res.id ? res : el));

        //Actualizar vista
        const table = vistaTable(data);
        main.innerHTML = form + table;

        //Reset de valores
        values = {
          ...initialValues,
        };
      })
      .catch((err) => {
        main.innerHTML = form + vistaError(err);
      });
  } else {
    //Actualizar vista
    const form = vistaForm();
    const spinner = vistaSpinner();
    main.innerHTML = form + spinner;

    const options = {
      body: values,
      headers: {
        "Content-Type": "application/json",
      },
    };

    ajax
      .post(url, options)
      .then((res) => {
        //Actualizar Array
        data = [...data, res];

        //Actualizar vista
        const table = vistaTable(data);
        main.innerHTML = form + table;

        //Reset de valores
        values = {
          ...initialValues,
        };
      })
      .catch((err) => {
        main.innerHTML = form + vistaError(err);
      });
  }
};

const handleClick = (e) => {
  const btn = e.target;

  if (btn.id === "modificar") {
    const idPersonaje = btn.dataset.personaje;
    const personaje = data.find((el) => el.id === idPersonaje);

    //Actualizar valores de los input
    values = {
      ...initialValues,
      ...personaje,
    };

    //Actualizar vista
    const form = vistaForm(values);
    const table = vistaTable(data);
    main.innerHTML = form + table;
  }

  if (btn.id === "eliminar") {
    const idPersonaje = btn.dataset.personaje;

    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${idPersonaje}'?`
    );

    if (isDelete) {
      //Actualizar vista
      const form = vistaForm();
      const spinner = vistaSpinner();
      main.innerHTML = form + spinner;

      const endpoint = `${url}/${idPersonaje}`;
      const options = {
        headers: { "content-type": "application/json" },
      };

      ajax
        .del(endpoint, options)
        .then((res) => {
          //Creación de nuevo array eliminando el dato
          const newData = data.filter((el) => el.id !== idPersonaje);

          //Actualizar Array
          data = [...newData];

          //Actualizar vista
          const table = vistaTable(data);
          main.innerHTML = form + table;
        })
        .catch((err) => {
          main.innerHTML = form + vistaError(err);
        });
    } else {
      return;
    }
  }
};

//Vista inicial
window.addEventListener("DOMContentLoaded", () => {
  const form = vistaForm();
  const spinner = vistaSpinner();
  main.innerHTML = form + spinner;

  //Traer los datos de la api (GET)
  ajax
    .get(url)
    .then((res) => {
      data = [...res];
      const table = vistaTable(res);
      main.innerHTML = form + table;
    })
    .catch((err) => {
      main.innerHTML = form + vistaError(err);
    });

  //Agregar Listeners
  main.addEventListener("change", handleChange);
  main.addEventListener("submit", handleSubmit);
  main.addEventListener("click", handleClick);
});
