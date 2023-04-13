const vistaForm = (element) => {
  if (element) {
    const { id, name, house } = element;
    return `
    <div class="mb-4">
        <h3>Editar</h3>
        <form class="p-4">
            <input
            type="text"
            name="name"
            placeholder="Nombre"
            class="me-4 row mb-3"
            value="${name}";
            />
            <input
            type="text"
            name="house"
            placeholder="Casa"
            class="me-4 row mb-3"
            value="${house}"
            />
            <input type="submit" value="Enviar" class="me-2 btn btn-success" />
            <input type="reset" value="Limpiar" class="btn btn-danger" id="limpiar" />
        </form>
    </div>
    `;
  }

  return `
    <div class="mb-4">
        <h3>Agregar</h3>
        <form class="p-4">
            <input
            type="text"
            name="name"
            placeholder="Nombre"
            class="me-4 row mb-3"
            />
            <input
            type="text"
            name="house"
            placeholder="Casa"
            class="me-4 row mb-3"
            />
            <input type="submit" value="Enviar" class="me-2 btn btn-success" />
            <input type="reset" value="Limpiar" class="btn btn-danger" />
        </form>
    </div>
    `;
};
