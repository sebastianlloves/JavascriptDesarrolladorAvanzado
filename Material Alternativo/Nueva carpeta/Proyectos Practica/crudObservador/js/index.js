const main = document.querySelector("main");
const ajax = helpHttp();

async function start(url) {
  this.state = this.setState({
    ...this.state,
    loading: true,
  });
  this.notify(this.state);

  const newState = await this.getCharacters(url);
  this.update(newState);
}

function setState(newState) {
  const state = this.state;

  for (const key in newState) {
    if (state.hasOwnProperty(key)) {
      state[key] = newState[key];
    }
  }

  return state;
}

function hasDataToEdit() {
  return this.state.dataToEdit;
}

function update(newState) {
  this.state = this.setState(newState);
  this.notify(this.state);
}

function encontrar(cb) {
  //Hard Binding de la función find de los Arrays para usarla en nuestro observer
  const find = Array.prototype.find.bind(this);
  return this.state.characters.find(cb);
}

async function getCharacters(url) {
  let newState;

  try {
    const response = await ajax.get(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const characters = await response.json();
    newState = {
      characters,
      loading: false,
      error: false,
    };
  } catch (error) {
    newState = {
      characters: [],
      loading: false,
      error,
    };
  }

  return newState;
}

async function postCharacter(endpoint, character) {
  let newState = {
    loading: true,
  };
  state.update(newState);

  try {
    const options = {
      body: character,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await ajax.post(endpoint, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const created = await response.json();
    const characters = this.state.characters;

    newState = {
      characters: [...characters, created],
      loading: false,
      error: null,
    };

    this.update(newState);
  } catch (error) {
    newState = {
      loading: false,
      error,
    };

    this.update(newState);
  }
}

async function putCharacter(endpoint, character) {
  let newState = {
    loading: true,
  };
  state.update(newState);

  try {
    const options = {
      body: character,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await ajax.put(endpoint, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const changed = await response.json();
    const characters = this.state.characters;
    const newCharacters = characters.map((el) =>
      el.id === changed.id ? changed : el
    );

    newState = {
      characters: newCharacters,
      loading: false,
      error: null,
      dataToEdit: null,
    };

    this.update(newState);
  } catch (error) {
    newState = {
      loading: false,
      error,
    };
    this.update(newState);
  }
}

async function deleteCharacter(endpoint, id) {
  const isDelete = confirm(`Vas a eliminar al personaje con el id: '${id}'`);

  if (isDelete) {
    let newState = {
      loading: true,
    };
    state.update(newState);

    try {
      const response = await ajax.del(endpoint);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const deleted = await response.json();
      const characters = this.state.characters;
      const newCharacters = characters.filter((el) => el.id !== deleted.id);

      newState = {
        characters: newCharacters,
        loading: false,
        error: null,
      };

      this.update(newState);
    } catch (error) {
      newState = {
        loading: false,
        error,
      };

      this.update(newState);
    }
  } else {
    return;
  }
}

function observer() {
  return {
    state: {
      characters: [],
      loading: false,
      error: false,
      dataToEdit: null,
    },
    iterator: {},
    subscribers: [],
    suscribe: function (subscriber) {
      this.subscribers.push(subscriber);
    },
    notify: function (state) {
      this.subscribers.forEach((subscriber) => {
        subscriber.notify(state);
      });
    },
    start,
    setState,
    hasDataToEdit,
    update,
    getCharacters,
    postCharacter,
    putCharacter,
    deleteCharacter,
    encontrar,
  };
}

function updateView(react) {
  return {
    notify: react,
  };
}

const createView = updateView((state) => {
  const { characters, loading, error, dataToEdit } = state;
  render(characters, loading, error, dataToEdit);
});

function render(characters, loading, error, dataToEdit) {
  let html = "";

  if (dataToEdit) html += vistaForm(dataToEdit);
  else html += vistaForm();

  if (loading) html += vistaSpinner();

  if (error) html += vistaError(error);

  html += vistaTable(characters);

  main.innerHTML = html;
}

//Ejecutar Observer y Observador
const state = observer();
state.suscribe(createView);

//Inicializar
const endpoint = "https://62633b22c430dc560d2cf4d6.mockapi.io/harryPotter";
state.start(endpoint);

//Delegación de Eventos
main.addEventListener("click", ({ target }) => {
  const targetID = target.id;
  switch (targetID) {
    case "modificar": {
      const idPersonaje = target.dataset.personaje;
      const personaje = state.encontrar((el) => el.id === idPersonaje);

      const newState = {
        dataToEdit: personaje,
      };

      state.update(newState);
      break;
    }

    case "eliminar": {
      const idPersonaje = target.dataset.personaje;
      const endpointID = `${endpoint}/${idPersonaje}`;
      state.deleteCharacter(endpointID, idPersonaje);
      break;
    }

    case "limpiar":
      const newState = {
        dataToEdit: null,
      };
      state.update(newState);
      break;
  }
});

main.addEventListener("submit", (e) => {
  e.preventDefault();
  if (state.hasDataToEdit()) {
    const old = state.hasDataToEdit();
    const endpointID = `${endpoint}/${old.id}`;
    const name = e.target.elements.name;
    const house = e.target.elements.house;

    const newCharacter = {
      ...old,
      name: name.value,
      house: house.value,
    };

    state.putCharacter(endpointID, newCharacter);
  } else {
    const name = e.target.elements.name;
    const house = e.target.elements.house;

    const newCharacter = {
      name: name.value,
      house: house.value,
    };

    state.postCharacter(endpoint, newCharacter);
  }
});
